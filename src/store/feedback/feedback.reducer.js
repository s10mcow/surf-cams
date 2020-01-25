import TYPES from './feedback.types';

const initialState = {
    allMedia: [],
    createMediaProgress: 0,
    createMediaWorking: false,
    createMediaFailed: false,
    selected: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.CREATE_MEDIA_START:
            return {
                ...state,
                createMediaProgress: 0,
                createMediaWorking: true,
            };
        case TYPES.CREATE_MEDIA_SUCCESS:
            return {
                ...state,
                createMediaProgress: 0,
                createMediaWorking: false,
            };
        case TYPES.CREATE_MEDIA_FAILED:
            return {
                ...state,
                createMediaProgress: 0,
                createMediaWorking: false,
                createMediaFailed: true,
            };
        case TYPES.CREATE_MEDIA_PROGRESS:
            return {
                ...state,
                createMediaProgress: action.payload,
                createMediaWorking: true,
            };
        case TYPES.SET_ALL_MEDIA:
            return {
                ...state,
                allMedia: action.payload,
            };
        case TYPES.SET_SELECTED_FEEDBACK:
            return {
                ...state,
                selected: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
