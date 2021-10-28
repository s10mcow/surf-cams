export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const setNewCamera = camera => {
  return {
    type: 'SET_NEW_CAMERA',
    camera
  }
}

export const addNewCamera = (
  camera = {
    url: 'https://cams.cdn-surfline.com/cdn-int/pt-arrifana/playlist.m3u8',
    name: 'Arrifana (Surfline)'
  }
) => {
  return {
    type: 'ADD_NEW_CAMERA',
    ...camera
  }
}

export const deleteCamera = camera => {
  return {
    type: 'DELETE_CAMERA',
    camera
  }
}
