import { takeLatest, call, take, put, fork } from 'redux-saga/effects';
import TYPES from './user.types';
import api from '../api';
import Config from '../../config/config';
import actions from './user.actions';
import { eventChannel, END } from 'redux-saga';
import axios from 'axios';
import netlifyIdentity from 'netlify-identity-widget';

function createLoginChannel() {
    return eventChannel(emit => {
        const loginHandler = event => {
            console.log(event);
            emit(event);
        };

        netlifyIdentity.on('login', loginHandler);

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {};

        return unsubscribe;
    });
}

export function* watchOnLogin() {
    const loginChannel = yield call(createLoginChannel);

    while (true) {
        try {
            const user = yield take(loginChannel);
            if (user) {
                const fauanaUser = yield api.readUser(user.id);
                if (fauanaUser && fauanaUser.data) {
                    yield put(actions.setUser.trigger(fauanaUser.data));
                } else {
                    const createdUser = yield call(api.createUser, {
                        image: {},
                        name: user.user_metadata.full_name,
                        id: user.id,
                    });
                    yield put(actions.setUser.trigger(createdUser.data.user));
                }
            }
        } catch (err) {
            console.error('socket error:', err);
        }
    }
}

function upload(payload, onProgress) {
    const url = `https://api.cloudinary.com/v1_1/${Config.cloud_name}/upload`;
    const { file } = payload;
    const data = new FormData();

    data.append('upload_preset', Config.upload_preset);
    data.append('file', file);
    data.append('tags', 'profile_image');
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

        if (event.loaded / event.total === 1) {
            emit(END);
        }
    });

    return [uploadPromise, chan];
}

function* watchOnProgress(chan) {
    while (true) {
        const data = yield take(chan);
        yield put(actions.updloadUserImageProgress.trigger(data));
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
            width: data.width,
            height: data.height,
        };
        yield call(uploadToFauna, media);
    } catch (e) {
        console.log(e);
    }
}

function* uploadToFauna(image) {
    try {
        const {
            id,
            user_metadata: { full_name },
        } = netlifyIdentity.currentUser();

        const res = yield call(api.readUser, id);
        const code = res && res.requestResult && res.requestResult.statusCode;
        if (res && res.data) {
            const ref = res.ref['@ref'].id;
            const user = yield call(api.patchUser, { data: { image }, ref });
            yield put(actions.setUser.trigger(user.data));
        }
        if (code === 404) {
            const createdUser = yield call(api.createUser, { image, name: full_name, id });
            yield put(actions.setUser.trigger(createdUser.data.user));
        }
    } catch (e) {
        console.log(e);
    }
}

function* uploadUserImage({ payload }) {
    try {
        yield put(actions.updloadUserImage.start());
        yield call(createCloudinaryMedia, { payload });
        yield put(actions.updloadUserImage.success());
    } catch (e) {
        console.log(e);
        yield put(actions.updloadUserImage.failed());
    }
}

export function* createMediaListener() {
    yield takeLatest(TYPES.UPLOAD_USER_IMAGE, uploadUserImage);
}

export default [createMediaListener];
