import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import netlifyIdentity from 'netlify-identity-widget';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { getUser } from '../store/user/user.selectors';
import { Avatar } from '@material-ui/core';
import { Image } from 'cloudinary-react';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const useDrawerStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function MenuAppBar() {
    const classes = useStyles();
    const [isOpen, toggleOpen] = React.useState(false);
    const drawerClasses = useDrawerStyles();
    const user = useSelector(getUser);
    const history = useHistory();

    return (
        <>
            <Drawer open={isOpen} onClose={() => toggleOpen(!isOpen)}>
                <div
                    className={drawerClasses.list}
                    role="presentation"
                    onClick={() => toggleOpen(false)}
                    onKeyDown={() => toggleOpen(false)}
                >
                    <List>
                        {user && (
                            <>
                                <ListItem button onClick={() => history.push('/profile')}>
                                    <ListItemIcon>
                                        {user && user.image && user.image.public_id ? (
                                            <Avatar>
                                                <Image publicId={user.image.public_id} crop="scale" width="50" />
                                            </Avatar>
                                        ) : (
                                            <AccountCircleIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={`Welcome ${user.name}!`} />
                                </ListItem>
                                <Divider />
                            </>
                        )}
                        <ListItem button onClick={() => history.push('/feedback')}>
                            <ListItemIcon>
                                <PhotoLibraryIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Media Feed'} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {user && (
                            <ListItem button onClick={() => netlifyIdentity.logout()}>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Log out'} />
                            </ListItem>
                        )}
                        {!user && (
                            <ListItem button onClick={() => netlifyIdentity.open()}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Log in'} />
                            </ListItem>
                        )}
                    </List>
                </div>
            </Drawer>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={() => toggleOpen(!isOpen)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title} onClick={() => history.push('/')}>
                            howisthe.surf
                        </Typography>
                        {user && (
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => history.push('/profile')}
                                color="inherit"
                            >
                                {user && user.image && user.image.public_id ? (
                                    <Avatar>
                                        <Image publicId={user.image.public_id} crop="scale" width="55" />
                                    </Avatar>
                                ) : (
                                    <AccountCircleIcon />
                                )}
                            </IconButton>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}
