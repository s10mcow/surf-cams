import React from 'react';
import { FilePicker } from 'react-file-picker';
import { CircularProgress, Button } from '@material-ui/core';
import { CameraAlt, Home } from '@material-ui/icons';
import { Transformation, Video } from 'cloudinary-react';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../store/feedback/feedback.actions';
import { getCreateMediaProgress, getMediaByName, getFetchingMedia } from '../../store/feedback/feedback.selectors';
import MediaCard, { NoMediaCard } from '../MediaCard';
import Slide from '@material-ui/core/Slide';
import { Feedback, UploadingImage, UploadingImageWrapper, MediaList } from './Components';
import { getUser } from '../../store/user/user.selectors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default ({ toggle, name }) => {
    const [image, setImage] = React.useState(null);
    const dispatch = useDispatch();
    const [createMediaProgress, createMediaWorking] = useSelector(getCreateMediaProgress);
    const media = useSelector(state => getMediaByName(state, name));
    const isFetchingMedia = useSelector(getFetchingMedia);
    const user = useSelector(getUser);
    const isLoggedIn = user && user.id;

    React.useEffect(() => {
        dispatch(actions.fetchAllMedia.trigger());
    }, [dispatch]);

    const createMedia = file => {
        const mediaUrl = URL.createObjectURL(file);
        setImage(mediaUrl);
        dispatch(actions.createMedia.trigger({ file, tags: name }));
    };

    return (
        <>
            <Dialog
                fullScreen
                aria-labelledby="simple-dialog-title"
                open={createMediaWorking}
                TransitionComponent={Transition}
            >
                <UploadingImageWrapper>
                    <UploadingImage url={image} />
                    {createMediaProgress > 0 && createMediaProgress < 100 ? (
                        <CircularProgress
                            className="CircularProgress"
                            variant="determinate"
                            value={createMediaProgress}
                        />
                    ) : (
                        <CircularProgress className="CircularProgress" />
                    )}
                </UploadingImageWrapper>
            </Dialog>
            <Feedback className="feedback">
                {isFetchingMedia ? (
                    <CircularProgress />
                ) : (
                    <MediaList>
                        {media &&
                            media.length > 0 &&
                            media.map(({ data }) =>
                                data.resource_type === 'image' ? (
                                    <MediaCard key={data.public_id} data={data} />
                                ) : (
                                    <Video
                                        key={data.public_id}
                                        controls
                                        publicId={`${data.public_id}.gif`}
                                        resourceType={data.resource_type}
                                    >
                                        <Transformation audioCodec="none" flags="animated" quality="auto" />
                                    </Video>
                                )
                            )}
                        {media && media.length === 0 && (
                            <NoMediaCard>
                                <p>No images here!</p>
                                <p>Log in and get some media moving!</p>
                            </NoMediaCard>
                        )}
                    </MediaList>
                )}

                <footer className="feedback__footer">
                    <Button className="feedback__back" onClick={toggle}>
                        <Home color="white" />
                    </Button>
                    {isLoggedIn && (
                        <FilePicker
                            maxSize={10}
                            dims={{ minWidth: 100, minHeight: 100 }}
                            onChange={createMedia}
                            onError={errMsg => console.log(errMsg)}
                        >
                            <Button className="feeback__camera">
                                <CameraAlt />
                            </Button>
                        </FilePicker>
                    )}
                </footer>
            </Feedback>
        </>
    );
};
