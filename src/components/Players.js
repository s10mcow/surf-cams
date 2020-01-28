import React from 'react';
import Player from './Player';
import Button from 'muicss/lib/react/button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useDispatch } from 'react-redux';
import actions from '../store/feedback/feedback.actions';
import { useHistory } from 'react-router';

export default function PlayersContainer({ cameras, beachNames, deleteCamera, addNewCamera, updateCamera, showModal }) {
    const players = cameras.length === 1 ? 'players players--single' : 'players';
    const [open, setOpen] = React.useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    const setSelectedFeedback = selectedFeedback => dispatch(actions.setSelectedFeedback.trigger(selectedFeedback));

    const showFeedbackInPlayer = name => {
        setSelectedFeedback(name);
        history.push('/feedback');
    };
    const handleClose = () => {
        setOpen(false);
    };

    const buyBeer = () => {
        const a = document.createElement('a');
        a.href = 'https://www.paypal.com/paypalme2/powdertothepeopletv';
        a.target = '_blank';
        a.click();
        setOpen(false);
    };

    React.useEffect(() => {
        setOpen(showModal);
    }, [showModal]);

    return (
        <div className="players__wrapper">
            <Dialog
                className="players__wrapper__dialog"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        We all hate ads.
                        <br /> Thats why we're here.
                        <br /> If you like what you see.
                        <br /> Buy me a beer...
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No thanks.</Button>
                    <Button onClick={buyBeer} color="primary">
                        Hell yeah!
                    </Button>
                </DialogActions>
            </Dialog>
            <section className={players}>
                {cameras.map((camera, index) => (
                    <Player
                        key={index}
                        index={index}
                        name={camera.name}
                        url={camera.url}
                        beachNames={beachNames}
                        deleteCamera={deleteCamera}
                        updateCamera={updateCamera}
                        showFeedback={showFeedbackInPlayer}
                    />
                ))}
            </section>
            <Button color="primary" onClick={addNewCamera}>
                Add Camera
            </Button>
            <div id="wg_target_div_512670_72189470" />
        </div>
    );
}
