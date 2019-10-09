import { connect } from 'react-redux';
import Players from '../components/Players';
import { setNewCamera } from '../store/actions';
import { addNewCamera } from '../store/actions';
import { deleteCamera } from '../store/actions';
import { beaches } from '../beaches.json';

const mapStateToProps = state => {
    return {
        showModal: state.app && state.app.cams === 2,
        cameras: state.cameras,
        beachNames: Object.keys(beaches)
            .reduce((memo, beachKey) => memo.concat(beaches[beachKey]), [])
            .sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            }),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: camera => dispatch(setNewCamera(camera)),
        addNewCamera: () => dispatch(addNewCamera()),
        deleteCamera: camera => dispatch(deleteCamera(camera)),
    };
};

const PlayersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Players);

export default PlayersContainer;
