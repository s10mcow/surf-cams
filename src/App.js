import React, { Component } from 'react';
import Layout from './components/Layout';
import PlayersContainer from './containers/PlayersContainer';

export default class App extends Component {
    render() {
        window.location.href = 'https://howisthe.surf';
        return (
            <Layout>
                <header className="page__header">
                    <h1>Portugal Beach Cams</h1>
                </header>

                <PlayersContainer />
            </Layout>
        );
    }
}
