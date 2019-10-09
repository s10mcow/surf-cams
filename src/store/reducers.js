import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import visibilityFilter from './reducers/visibilityFilter';
import cameras from './reducers/cameras';
import app from './reducers/app';

export default history =>
    combineReducers({
        router: connectRouter(history),
        visibilityFilter,
        cameras,
        app,
    });
