import beaches from '../../beaches';

const initalState = beaches.pt.beaches.slice(4, 6);

const cameras = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_NEW_CAMERA':
            const newState = [...state];
            newState[action.camera.index] = { url: action.camera.url, name: action.camera.name };
            return newState;
        case 'ADD_NEW_CAMERA':
            return [
                ...state,
                {
                    url: action.url,
                    name: action.name,
                },
            ];
        case 'DELETE_CAMERA':
            return state.filter((camera, index) => index !== action.camera.index);
        default:
            return state;
    }
};

export default cameras;
