import TYPES from './feedback.types';

const initialState = {
    allMedia: [],
    createMediaProgress: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.CREATE_MEDIA_START:
            return {
                ...state,
                createMediaProgress: 0,
            };
        case TYPES.CREATE_MEDIA_SUCCESS:
            return {
                ...state,
                createMediaProgress: 0,
            };
        case TYPES.CREATE_MEDIA_PROGRESS:
            return {
                ...state,
                createMediaProgress: action.payload,
            };
        case TYPES.SET_ALL_MEDIA:
            return {
                ...state,
                allMedia: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
