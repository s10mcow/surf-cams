import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { formatDistance } from 'date-fns';
import { Image } from 'cloudinary-react';

const useStyles = makeStyles({
    card: {
        flex: 1,
        marginBottom: 50,
    },
    media: {
        width: '100%',
    },
});

export default function MediaCard({ data }) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <Image className={classes.media} publicId={data.public_id} crop="scale" />

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
