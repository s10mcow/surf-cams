import React from 'react';
import Feedback from '../components/Feedback/Feedback';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { getSelectedFeedback } from '../store/feedback/feedback.selectors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import actions from '../store/feedback/feedback.actions';

const useStyles = makeStyles({
    dialog: {
        paddingLeft: 0,
        paddingRight: 0,
    },
});

export default function FeedbackDialog() {
    const classes = useStyles();
    const selectedFeedback = useSelector(getSelectedFeedback);
    const history = useHistory();
    const dispatch = useDispatch();

    const closeFeedback = () => {
        dispatch(actions.setSelectedFeedback.trigger(selectedFeedback));
        history.push('/');
    };

    return (
        <Dialog fullScreen open={true} onClose={closeFeedback}>
            <DialogContent className={classes.dialog}>
                <Feedback name={selectedFeedback} toggle={closeFeedback} />
            </DialogContent>
        </Dialog>
    );
}
