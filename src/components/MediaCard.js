import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { formatDistance } from 'date-fns';
import { Image } from 'cloudinary-react';
import styled from 'styled-components';

export const NoMediaCard = styled.article`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 30px;
    min-height: 150px;
    flex: 1;
    font-size: 20px;
    background: #ccc;
    border-radius: 5px;
    color: white;
`;

const useStyles = makeStyles({
    card: {
        flex: 1,
        marginBottom: 50,
        maxWidth: '650px',
        maxHeight: '800px',
        paddingBottom: '125%',
        position: 'relative',
    },
    media: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        userSelect: 'none',
        width: '100%',
    },
});

export default function MediaCard({ data }) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Image className={classes.media} publicId={data.public_id} crop="scale" />
            <CardActionArea>
                <CardContent>
                    {data.created_at && (
                        <Typography gutterBottom variant="h5" component="h2">
                            {formatDistance(new Date(data.created_at), new Date())} ago
                        </Typography>
                    )}
                    {data.tags.map((tag, key) => (
                        <Typography key={key} variant="body2" color="textSecondary" component="p">
                            {tag}
                        </Typography>
                    ))}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
