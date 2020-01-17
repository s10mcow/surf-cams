import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { formatDistance } from 'date-fns';

const useStyles = makeStyles({
    card: {
        flex: 1,
        marginBottom: 50,
    },
    media: {
        height: 300,
    },
});

export default function MediaCard({ data }) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia className={classes.media} image={data.url} title={data.tags[0]} />
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
