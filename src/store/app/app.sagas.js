import { takeLatest, call, put, fork } from 'redux-saga/effects';
import TYPES from './app.types';
import userActions from '../user/user.actions';
import actions from './app.actions';
import api from '../api';
import { watchOnLogin } from '../user/user.saga';
import netlifyIdentity from 'netlify-identity-widget';

function* initApp() {
    try {
        // yield call(netlifyIdentity.init);
        // yield fork(watchOnLogin);
        // const user = yield call(netlifyIdentity.currentUser);
        // console.log('Netlify user found', user);
        // if (user) {
        //     const fauanaUser = yield api.readUser(user.id);
        //     if (fauanaUser && fauanaUser.data) {
        //         yield put(userActions.setUser.trigger(fauanaUser.data));
        //     } else {
        //         const createdUser = yield call(api.createUser, {
        //             image: {},
        //             name: user.user_metadata.full_name,
        //             id: user.id,
        //         });
        //         yield put(userActions.setUser.trigger(createdUser.data.user));
        //     }
        // }

        yield put(actions.userInitialized.trigger(true));
    } catch (e) {
        console.log(e);
    }
}

export function* initAppListener() {
    yield takeLatest(TYPES.INIT_APP, initApp);
}

export default [initAppListener];
