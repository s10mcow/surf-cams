import TYPES from './app.types';

const initialState = {
    userInitialized: undefined,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.USER_INITIALIZED:
            return {
                ...state,
                userInitialized: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
