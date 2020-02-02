import { takeLatest, call, put } from 'redux-saga/effects';
import TYPES from './app.types';
import userActions from '../user/user.actions';
import actions from './app.actions';
import api from '../api';

import netlifyIdentity from 'netlify-identity-widget';

function* initApp() {
    try {
        yield call(netlifyIdentity.init);
        const user = yield call(netlifyIdentity.currentUser);
        if (user) {
            const fauanaUser = yield api.readUser(user.id);
            if (fauanaUser && fauanaUser.data) {
                yield put(userActions.setUser.trigger(fauanaUser.data));
            } else {
                yield put(userActions.setUser.trigger(user));
            }
        }

        yield put(actions.userInitialized.trigger(true));
    } catch (e) {
        console.log(e);
    }
}

export function* initAppListener() {
    yield takeLatest(TYPES.INIT_APP, initApp);
}

export default [initAppListener];
