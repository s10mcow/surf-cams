import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { persistReducer, persistStore } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'redux-persist/lib/storage'
import SagaManager from './sagas'
import createSagaMiddleware from 'redux-saga'
// MIDDLEWARES
export const history = createBrowserHistory()

const router = routerMiddleware(history)

const sagaMiddleware = createSagaMiddleware({
  onError: error => {
    console.error(error)
    if (process.env.NODE_ENV === 'development') {
      console.log(error)
    }
  }
})

const createReducer = createRootReducer => {
  const config = {
    key: 'root',
    whitelist: ['visibilityFilter', 'cameras', 'beaches'],
    storage,
    stateReconciler: hardSet,

  }

  return persistReducer(config, createRootReducer(history))
}

let middlewares = [sagaMiddleware, router]

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`)
  middlewares.push(logger)
}
export const store = createStore(
  createReducer(rootReducer),
  applyMiddleware(...middlewares)
)

// SAGAS
SagaManager.startSagas(sagaMiddleware)

export default () => {
  const persistor = persistStore(store)
  return { store, persistor }
}
