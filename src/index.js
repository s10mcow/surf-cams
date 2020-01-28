import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import getStoreAndPersistor, { history } from './store/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import BaseStyles from './base-styles';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import netlifyIdentity from 'netlify-identity-widget';

ReactGA.initialize('UA-107212380-1');

const { store, persistor } = getStoreAndPersistor();
netlifyIdentity.init();
const render = Component =>
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BaseStyles />
                <ConnectedRouter history={history}>
                    <BrowserRouter>
                        <Component />
                    </BrowserRouter>
                </ConnectedRouter>
            </PersistGate>
        </Provider>,
        document.getElementById('root')
    );

render(App);

//Test
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
    onUpdate: registration => {
        const waitingServiceWorker = registration.waiting;

        if (waitingServiceWorker) {
            waitingServiceWorker.addEventListener('statechange', event => {
                if (event.target.state === 'activated') {
                    window.location.reload();
                }
            });
            waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
        }
    },
});
