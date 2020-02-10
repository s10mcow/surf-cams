import TYPES from './user.types';

const initialState = {
    user: {
        image: '',
        name: '',
    },
    isUploading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case TYPES.UPLOAD_USER_IMAGE_START:
            return {
                ...state,
                isUploading: true,
            };
        case TYPES.UPLOAD_USER_IMAGE_FAILED:
        case TYPES.UPLOAD_USER_IMAGE_SUCCESS:
            return {
                ...state,
                isUploading: false,
            };
        case TYPES.LOGOUT:
            return { ...initialState };

        default:
            return state;
    }
};

export default reducer;
