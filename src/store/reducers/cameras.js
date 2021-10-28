import beaches from '../../beaches'

const initalState = beaches.pt.beaches.slice(4, 6)

const cameras = (state = initalState, action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_NEW_COUNTRY':
      return beaches[action.payload.country].beaches.slice(0, 2)
    case 'SET_NEW_CAMERA':
      const newState = [...state]
      newState[action.camera.index] = {
        url: action.camera.url,
        name: action.camera.name
      }
      return newState
    case 'ADD_NEW_CAMERA':
      return [
        ...state,
        {
          url: action.url,
          name: action.name
        }
      ]
    case 'DELETE_CAMERA':
      return state.filter((camera, index) => index !== action.camera.index)
    default:
      return state
  }
}

export default cameras

export const getCameras = state => state && state.cameras
