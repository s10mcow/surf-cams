import { beaches } from '../../beaches.json';

const initalState = beaches.slice(4, 6);

const cameras = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_NEW_CAMERA':
            const newState = [...state];
            newState[action.camera.index] = beaches
                .filter(beach => beach.url === action.camera.url)
                .reduce((memo, beach) => beach, {});
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
