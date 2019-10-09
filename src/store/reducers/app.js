const initalState = { cams: 1 };

const cameras = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_NEW_CAMERA':
        case 'ADD_NEW_CAMERA':
            return {
                ...state,
                cams: (state.cams += 1),
            };

        default:
            return state;
    }
};

export default cameras;
