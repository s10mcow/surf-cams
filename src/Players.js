import React from 'react';
import PlayersContainer from './containers/PlayersContainer';
import AppBar from './components/AppBar';

export default function App() {
    window.location.href = 'https://random-x.vercel.app/';
    return (
        <>
            <AppBar />
            <PlayersContainer />
        </>
    );
}
