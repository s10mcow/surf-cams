import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { formatDistance } from 'date-fns';
import { Image } from 'cloudinary-react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

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

const User = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;

    .User__name {
        margin-left: 10px;
        font-weight: bold;
        font-size: 14px;
    }
`;

const useStyles = makeStyles(() => ({
    card: props => ({
        marginBottom: 20,
        paddingBottom: `${(props.height / props.width) * 100}%`,
        position: 'relative',
        borderRadius: 0,
    }),
    media: {
        position: 'absolute',
        left: 0,
        top: 75,
        width: '100%',
        userSelect: 'none',
        objectFit: 'cover',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'white',
    },
}));

export default function MediaCard({ data }) {
    const classes = useStyles(data);

    return (
        <Card className={classes.card}>
            <Image className={classes.media} publicId={data.public_id} crop="scale" width="700" />
            <CardActionArea>
                <CardContent className={classes.content}>
                    <User>
                        <Avatar>
                            <Image publicId={data.user.image.public_id} crop="scale" width="50" />
                        </Avatar>
                        <div className="User__name">{data.user.name}</div>
                    </User>
                    <div>
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
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
