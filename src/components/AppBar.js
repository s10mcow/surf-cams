import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
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
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../store/user/user.selectors';
import userActions from '../store/user/user.actions';
// import appActions from '../store/app/app.actions';
import { Avatar } from '@material-ui/core';
import { Image } from 'cloudinary-react';
import lightblue from '@material-ui/core/colors/lightBlue';
import { CameraAlt } from '@material-ui/icons';
import styled from 'styled-components';
import logo from '../logo.png';

const Logo = styled.div`
    background-image: url(${logo});
    background-size: contain;
    background-repeat: no-repeat;
    height: 40px;
    width: 40px;
`;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: lightblue[700],
    },
    menuButton: {
        marginRight: 'auto',
    },
    title: {
        flexGrow: 1,
        fontFamily: 'Lacquer !important',
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
    const isLoggedIn = user && user.id;
    const history = useHistory();

    const dispatch = useDispatch();

    const logOut = () => {
        netlifyIdentity.logout();
        dispatch(userActions.logout.trigger());
    };

    const login = () => {
        netlifyIdentity.open('login');
    };

    return (
        <>
            <Drawer open={isOpen} onClose={() => toggleOpen(!isOpen)} anchor="right">
                <div
                    className={drawerClasses.list}
                    role="presentation"
                    onClick={() => toggleOpen(false)}
                    onKeyDown={() => toggleOpen(false)}
                >
                    <List>
                        {isLoggedIn && (
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
                        {isLoggedIn && (
                            <ListItem button onClick={() => history.push('/profile')}>
                                <ListItemIcon>
                                    <PhotoLibraryIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Profile'} />
                            </ListItem>
                        )}
                        <ListItem button onClick={() => history.push('/feedback')}>
                            <ListItemIcon>
                                <PhotoLibraryIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Media Feed'} />
                        </ListItem>
                        <ListItem button onClick={() => history.push('/')}>
                            <ListItemIcon>
                                <CameraAlt />
                            </ListItemIcon>
                            <ListItemText primary={'Cameras'} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {isLoggedIn && (
                            <ListItem button onClick={logOut}>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Log out'} />
                            </ListItem>
                        )}
                        {!isLoggedIn && (
                            <ListItem button onClick={login}>
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
                <AppBar position="static" className={classes.header}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={() => history.push('/')}
                        >
                            <Logo className={classes.title} />
                        </IconButton>

                        {/* {isLoggedIn ? (
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => toggleOpen(!isOpen)}
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
                        ) : (
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => toggleOpen(!isOpen)}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        )} */}
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}
