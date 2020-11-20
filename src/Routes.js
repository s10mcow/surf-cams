import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Players from './Players';
import { IdentityContextProvider } from 'react-netlify-identity';
import Feedback from './containers/Feedback';
import FeedbackImage from './containers/FeedbackImage';
import Profile from './containers/Profile';
const url = 'https://howisthe.surf/'; // supply the url of your Netlify site instance. VERY IMPORTANT. no point putting in env var since this is public anyway

export default function Routes() {
    return (
        <IdentityContextProvider url={url}>
            <Switch>
                <Route exact path="/" component={Players} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/feedback" component={Feedback} />
                <Route exact path="/feedback/:publicId" component={FeedbackImage} />
            </Switch>
        </IdentityContextProvider>
    );
}
