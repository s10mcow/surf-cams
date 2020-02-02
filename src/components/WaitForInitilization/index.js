import React from 'react';
import { useSelector } from 'react-redux';
import { appUserInitialized } from '../../store/app/app.selectors';

export default ({ children }) => {
    const userInitialized = useSelector(appUserInitialized);
    console.log(userInitialized);
    return !userInitialized ? <div>loading</div> : <div>{children}</div>;
};
