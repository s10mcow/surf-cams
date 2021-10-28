import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import visibilityFilter from './reducers/visibilityFilter';
import cameras from './reducers/cameras';
import beaches from './beaches/beaches.reducer';

import app from './reducers/app';

import application from './app/app.reducers';
import feedback from './feedback/feedback.reducer';
import user from './user/user.reducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        visibilityFilter,
        cameras,
        app,
        beaches,
        feedback,
        user,
        application,
    });
