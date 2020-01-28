import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Players from './Players';
import { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity';
import netlifyIdentity from 'netlify-identity-widget';
import Feedback from './containers/Feedback';

const url = 'https://howisthe.surf/'; // supply the url of your Netlify site instance. VERY IMPORTANT. no point putting in env var since this is public anyway

function useLoading() {
    const [isLoading, setState] = React.useState(false);
    const mount = React.useRef(false);
    React.useEffect(() => {
        mount.current = true;
        return () => void (mount.current = false);
    }, []);
    function load(aPromise) {
        setState(true);
        return aPromise.finally(() => mount.current && setState(false));
    }
    return [isLoading, load];
}

// eslint-disable-next-line
function Login({}) {
    const { loginUser, signupUser, settings, loginProvider } = useIdentityContext();
    const formRef = React.useRef(null);
    const [msg, setMsg] = React.useState('');
    const [isLoading, load] = useLoading();
    const signup = () => {
        const email = formRef.current.email.value;
        const password = formRef.current.password.value;
        load(
            signupUser(email, password, {
                data: 'signed up thru react-netlify-identity',
            })
        )
            .then(user => {
                console.log('Success! Signed up', user);
            })
            .catch(err => void console.error(err) || setMsg('Error: ' + err.message));
    };
    netlifyIdentity.open();

    return (
        <form
            ref={formRef}
            onSubmit={e => {
                e.preventDefault();
                const email = formRef.current.email.value;
                const password = formRef.current.password.value;
                load(loginUser(email, password))
                    .then(user => {
                        console.log('Success! Logged in', user);
                    })
                    .catch(err => void console.error(err) || setMsg('Error: ' + err.message));
            }}
        >
            <div>
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
            </div>
            {isLoading ? (
                <div>loading</div>
            ) : (
                <div>
                    <input type="submit" value="Log in" />
                    <button onClick={signup}>Sign Up </button>
                    {msg && <pre>{msg}</pre>}
                </div>
            )}
            {settings && <pre>{JSON.stringify(settings, null, 2)}</pre>}
            {settings && settings.external.bitbucket && (
                <button className="btn" onClick={() => loginProvider('bitbucket')}>
                    bitbucket
                </button>
            )}
            {settings && settings.external.github && (
                <button className="btn" style={{ background: 'lightblue' }} onClick={() => loginProvider('github')}>
                    GitHub
                </button>
            )}
            {settings && settings.external.gitlab && (
                <button className="btn" style={{ background: 'darkgreen' }} onClick={() => loginProvider('gitlab')}>
                    Gitlab
                </button>
            )}
            {settings && settings.external.google && (
                <button className="btn" style={{ background: 'lightsalmon' }} onClick={() => loginProvider('google')}>
                    Google
                </button>
            )}
        </form>
    );
}

export default function Routes() {
    return (
        <IdentityContextProvider url={url}>
            <Switch>
                <Route exact path="/" component={Players} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/feedback" component={Feedback} />
            </Switch>
        </IdentityContextProvider>
    );
}
