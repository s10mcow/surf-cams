import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router';
import { Image } from 'cloudinary-react';
import Card from '@material-ui/core/Card';
import { MediaList, Feedback } from '../components/Feedback/Components';
import styled from 'styled-components';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Appbar from '../components/AppBar';
const useStyles = makeStyles(() => ({
    card: {
        flex: 1,
        position: 'absolute',
        top: -31,
        left: 0,
        right: 0,
    },
    media: {
        position: 'absolute',
        left: 0,
        top: 20,
        width: '100%',
        userSelect: 'none',
        objectFit: 'cover',
    },
    header: {
        fontFamily: 'Lacquer !important',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'white',
    },
}));

const MediaItem = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 35% auto 0;
    max-width: 650px;
    width: 100%;
    height: 100%;
`;

const FeedbackDetail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
`;

export default function FeedbackDialog() {
    const classes = useStyles();
    const { publicId } = useParams();

    return (
        <>
            <Appbar />
            <FeedbackDetail>
                <MediaItem style={{ position: 'relative' }}>
                    <Card className={classes.card}>
                        <CardHeader disableTypography={true} title="Howisthe.surf" className={classes.header} />
                    </Card>
                    <Image className={classes.media} publicId={publicId} crop="scale" width="700" />
                </MediaItem>
            </FeedbackDetail>
        </>
    );
}
