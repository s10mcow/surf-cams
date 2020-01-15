import { takeLatest, call, take, put, fork } from 'redux-saga/effects';
import TYPES from './feedback.types';
import api from '../api';
import Config from '../../config/config';
import actions from './feedback.actions';
import { eventChannel } from 'redux-saga';
import axios from 'axios';

function upload(payload, onProgress) {
    const url = `https://api.cloudinary.com/v1_1/${Config.cloud_name}/upload`;
    const { file, tags } = payload;
    const data = new FormData();

    data.append('upload_preset', Config.upload_preset);
    data.append('file', file);
    data.append('tags', tags);
    data.append('context', `photo=${file.name}`);

    const config = {
        onUploadProgress: onProgress,
    };

    return axios.post(url, data, config);
}

function progressChannel(payload) {
    let emit;
    const chan = eventChannel(emitter => {
        emit = emitter;
        return () => {};
    });

    const uploadPromise = upload(payload, event => {
        if (event.type === 'progress') {
            emit(event.loaded / event.total);
        }
    });

    return [uploadPromise, chan];
}

function* watchOnProgress(chan) {
    while (true) {
        const data = yield take(chan);
        yield put(actions.createMediaProgress.trigger(data));
    }
}

function* createCloudinaryMedia({ payload }) {
    try {
        const [uploadPromise, chan] = progressChannel(payload);
        yield fork(watchOnProgress, chan);
        const { data } = yield call(() => uploadPromise);
        const media = {
            public_id: data.public_id,
            tags: data.tags,
            resource_type: data.resource_type,
            created_at: data.created_at,
            url: data.url,
        };
        yield call(uploadToFauna, media);
    } catch (e) {
        console.log(e);
    }
}

function* uploadToFauna(media) {
    try {
        yield call(api.createMedia, media);
        yield call(fetchAllMedia);
    } catch (e) {
        console.log(e);
    }
}

function* createMedia({ payload }) {
    try {
        yield put(actions.createMedia.start());
        yield call(createCloudinaryMedia, { payload });
        yield put(actions.createMedia.success());
    } catch (e) {
        console.log(e);
    }
}

function* fetchAllMedia() {
    try {
        yield put(actions.fetchAllMedia.start());
        const allMedia = yield call(api.fetchAllMedia);
        yield put(actions.setAllMedia.trigger(allMedia));
        yield put(actions.fetchAllMedia.success());
    } catch (e) {
        console.log(e);
    }
}

export function* createMediaListener() {
    yield takeLatest(TYPES.CREATE_MEDIA, createMedia);
}

export function* fetchAllMediaListener() {
    yield takeLatest(TYPES.FETCH_ALL_MEDIA, fetchAllMedia);
}

export default [createMediaListener, fetchAllMediaListener];
