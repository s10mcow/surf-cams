import TYPES from './feedback.types';

const initialState = {
    allMedia: [],
    createMediaProgress: 0,
    createMediaWorking: false,
    createMediaFailed: false,
    selected: '',
    fetchingMedia: false,
    showFeedback: false,
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
        case TYPES.FETCH_ALL_MEDIA_START:
            return {
                ...state,
                fetchingMedia: true,
                fetchingMediaError: false,
            };
        case TYPES.FETCH_ALL_MEDIA_FAILED:
            return {
                ...state,
                fetchingMedia: false,
                fetchingMediaError: true,
            };
        case TYPES.SET_ALL_MEDIA:
            return {
                ...state,
                allMedia: action.payload,
                fetchingMedia: false,
            };
        case TYPES.SET_SELECTED_FEEDBACK:
            return {
                ...state,
                selected: action.payload,
            };
        case TYPES.TOGGLE_FEEDBACK:
            return {
                ...state,
                showFeedback: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
