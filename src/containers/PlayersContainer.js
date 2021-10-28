import { connect } from 'react-redux'
import Players from '../components/Players'
import { setNewCamera } from '../store/actions'
import { addNewCamera } from '../store/actions'
import { deleteCamera } from '../store/actions'
import { getBeaches } from '../store/beaches/beaches.reducer'

const mapStateToProps = state => {
  return {
    showModal: state.app && state.app.cams === 2,
    cameras: state.cameras,
    beachNames: getBeaches(state)
      .reduce((memo, beachKey) => memo.concat([beachKey]), [])
      .sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
      })
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCamera: camera => dispatch(setNewCamera(camera)),
    addNewCamera: () => dispatch(addNewCamera()),
    deleteCamera: camera => dispatch(deleteCamera(camera))
  }
}

const PlayersContainer = connect(mapStateToProps, mapDispatchToProps)(Players)

export default PlayersContainer
