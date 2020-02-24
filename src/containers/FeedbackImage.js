import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router';
import { Image } from 'cloudinary-react';
import Card from '@material-ui/core/Card';
import { MediaList, Feedback } from '../components/Feedback/Components';
import styled from 'styled-components';

const useStyles = makeStyles(() => ({
    card: props => ({
        paddingBottom: `${(props.height / props.width) * 100}%`,
        position: 'relative',
        borderRadius: 0,
    }),
    media: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        userSelect: 'none',
        objectFit: 'cover',
    },
}));

const MediaItem = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 650px;
    width: 100%;
    height: 100%;
`;

const FeedbackDetail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    width: 100vw;
    height: 100vh;
`;

export default function FeedbackDialog() {
    const classes = useStyles();
    const { publicId } = useParams();

    return (
        <FeedbackDetail>
            <MediaItem style={{ position: 'relative' }}>
                <Image className={classes.media} publicId={publicId} crop="scale" width="700" />
            </MediaItem>
        </FeedbackDetail>
    );
}
