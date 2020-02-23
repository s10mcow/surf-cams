import React from 'react';
import { useSelector } from 'react-redux';
import { appUserInitialized } from '../../store/app/app.selectors';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

const Loader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

export default ({ children }) => {
    const userInitialized = useSelector(appUserInitialized);
    console.log(userInitialized);
    return !userInitialized ? (
        <Loader>
            <CircularProgress />
        </Loader>
    ) : (
        <div>{children}</div>
    );
};
