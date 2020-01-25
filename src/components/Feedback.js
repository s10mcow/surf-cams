import React from 'react';
import styled from 'styled-components';
import Button from 'muicss/lib/react/button';
import ReactGA from 'react-ga';
import { FilePicker } from 'react-file-picker';
import { CircularProgress } from '@material-ui/core';
import { CameraAlt, ArrowBack } from '@material-ui/icons';
import { Transformation, Video, CloudinaryContext } from 'cloudinary-react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../store/feedback/feedback.actions';
import { getCreateMediaProgress, getMediaByName } from '../store/feedback/feedback.selectors';
import MediaCard from './MediaCard';
import Slide from '@material-ui/core/Slide';

const Feedback = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 89vh;

    z-index: 1;
    background: white;

    .mui-btn {
        min-height: 40px;
    }
    .mui-btn--fab {
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .feedback__back {
        left: 0;
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

    // const resizeSvg = file => {
    //     // create image instance
    //     const previewUrl = URL.createObjectURL(file);

    //     const img = new Image();
    //     img.src = previewUrl;

    //     img.onload = () => {
    //         // dimensions to maintain svg aspect ratio
    //         const width = 800;
    //         const scaleFactor = width / img.width;
    //         const height = img.height * scaleFactor;

    //         // create canvas element
    //         const canvas = document.createElement("canvas");
    //         canvas.width = width;
    //         canvas.height = height;

    //         const ctx = canvas.getContext("2d");
    //         ctx.drawImage(img, 0, 0, width, height); // draw img to canvas

    //         // use canvas toBlob method to convert svg to png
    //         ctx.canvas.toBlob(
    //             blob => {
    //                 const convertedSvg = new File([blob], `${file.name}.png`, {
    //                     type: "image/png",
    //                     lastModified: Date.now()
    //                 });
    //                 setImageFromB64(convertedSvg);
    //             },
    //             "image/png",
    //             1
    //         );
    //     };
    // };

    // const parseLoadImage = file => {
    //     const options = { maxWidth: 800, meta: true };
    //     const convertCanvas = canvas => {
    //         canvas.toBlob(
    //             blob => {
    //                 const convertedSvg = new File([blob], `${file.name}.png`, {
    //                     type: "image/png",
    //                     lastModified: Date.now()
    //                 });
    //                 setImageFromB64(convertedSvg);
    //             },
    //             "image/png",
    //             1
    //         );
    //     };
    //     loadImage(file, convertCanvas, options);
    // };

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
                    {/* <MediaCard data={{ url: image, tags: ['Uploading...'] }} /> */}
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
