import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from './reducers';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// MIDDLEWARES
export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];

const middleware = [routerMiddleware(history)];

const createReducer = createRootReducer => {
    const config = {
        key: 'root',
        whitelist: ['visibilityFilter', 'cameras'],
        storage,
    };

    return persistReducer(config, createRootReducer(history));
};

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

export const store = createStore(
    createReducer(createRootReducer),
    initialState,
    compose(applyMiddleware(...middleware))
);

export default () => {
    const persistor = persistStore(store);
    return { store, persistor };
};
