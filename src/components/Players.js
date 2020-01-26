import React from 'react';
import Player from './Player';
import Button from 'muicss/lib/react/button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Feedback from './Feedback';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    dialog: {
        paddingLeft: 0,
        paddingRight: 0,
    },
});

export default function PlayersContainer({ cameras, beachNames, deleteCamera, addNewCamera, updateCamera, showModal }) {
    const players = cameras.length === 1 ? 'players players--single' : 'players';
    const [open, setOpen] = React.useState(false);
    const [selectedFeedback, setSelectedFeedback] = React.useState('');
    const [showFeedback, toggleFeedback] = React.useState(false);

    const showFeedbackInPlayer = name => {
        setSelectedFeedback(name);
        toggleFeedback(true);
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

    const classes = useStyles();

    return (
        <div className="players__wrapper">
            <Dialog fullScreen open={showFeedback} onClose={() => toggleFeedback(false)}>
                <DialogContent className={classes.dialog}>
                    <Feedback name={selectedFeedback} toggle={() => toggleFeedback(false)} />
                </DialogContent>
            </Dialog>
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
