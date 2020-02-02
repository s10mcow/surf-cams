import React from 'react';
import actions from '../../store/app/app.actions';
import { useDispatch } from 'react-redux';

export default () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(actions.initApp.trigger());
    }, []);
    return null;
};
