import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import visibilityFilter from './reducers/visibilityFilter';
import cameras from './reducers/cameras';

export default history =>
    combineReducers({
        router: connectRouter(history),
        visibilityFilter,
        cameras,
    });
