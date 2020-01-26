import React from 'react';
import styled from 'styled-components';
import Button from 'muicss/lib/react/button';
import { FilePicker } from 'react-file-picker';
import { CircularProgress } from '@material-ui/core';
import { CameraAlt, ArrowBack } from '@material-ui/icons';
import { Transformation, Video, CloudinaryContext } from 'cloudinary-react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../store/feedback/feedback.actions';
import { getCreateMediaProgress, getMediaByName } from '../store/feedback/feedback.selectors';
import MediaCard, { NoMediaCard } from './MediaCard';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const Feedback = styled.article`
    display: flex;
    flex-direction: column;

    .mui-btn {
        min-height: 40px;
    }
    .mui-btn--fab {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 5px;
        bottom: 0;
        svg {
            font-size: 25px;
        }
    }

    .feedback__back {
        left: 5px;
    }

    button input {
        display: none;
    }
`;

export const UploadingImage = styled.div`
    display: flex;
    flex: 1;
    background-image: ${props => `url(${props.url})`};
    width: 100vw;
    height: calc(100vw + 100px);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 1;
`;

const UploadingImageWrapper = styled.div`
    display: flex;
    flex: 1;
    position: relative;
    overflow: hidden;
    .CircularProgress {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -30px;
        margin-top: -30px;
    }
`;

const MediaList = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 650px;
    width: 100%;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default ({ toggle, name }) => {
    const [image, setImage] = React.useState(null);
    console.log(name);
    const dispatch = useDispatch();
    const [createMediaProgress, createMediaWorking] = useSelector(getCreateMediaProgress);
    const media = useSelector(state => getMediaByName(state, name));

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
                            size={60}
                        />
                    ) : (
                        <CircularProgress size={60} className="CircularProgress" />
                    )}
                </UploadingImageWrapper>
            </Dialog>
            <Feedback className="feedback">
                <Button color="primary" className="feedback__back" variant="fab" onClick={toggle}>
                    <ArrowBack />
                </Button>

                <MediaList>
                    {media && media.length > 0 && (
                        <CloudinaryContext cloudName="howisthesurf">
                            {media.map(({ data }) =>
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
                        </CloudinaryContext>
                    )}
                    {media && media.length === 0 && (
                        <NoMediaCard>
                            <p>No images here!</p>
                            <p>Log in and get some media moving!</p>
                        </NoMediaCard>
                    )}
                </MediaList>

                <FilePicker
                    maxSize={10}
                    dims={{ minWidth: 100, minHeight: 100 }}
                    onChange={createMedia}
                    onError={errMsg => console.log(errMsg)}
                >
                    <Button variant="fab">
                        <CameraAlt />
                    </Button>
                </FilePicker>
            </Feedback>
        </>
    );
};
