import React from 'react';

import styled from 'styled-components';
import PlayersContainer from './containers/PlayersContainer';
import { Menu } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import AppBar from './components/AppBar';
const PageHeader = styled.header`
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    max-height: 45px;
    width: 100%;
    background-color: #777777;
    color: white;
    padding: 10px;
    h1 {
        margin-left: 30px;
        font-size: 18px;
    }
    button {
        margin-left: auto;
        margin-right: 10px;
    }
`;

export default function App() {
    return (
        <>
            <AppBar />
            <PlayersContainer />
        </>
    );
}
