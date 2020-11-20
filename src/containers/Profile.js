import React from 'react';
import AppBar from '../components/AppBar';
import styled from 'styled-components';
import { FilePicker } from 'react-file-picker';
import Camera from '@material-ui/icons/CameraAlt';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../store/user/user.actions';
import { Image } from 'cloudinary-react';
import { getUser, getImageUploading } from '../store/user/user.selectors';
import { CircularProgress } from '@material-ui/core';

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    width: calc(100vw - 10px);
`;

export const ProfileHeader = styled.section`
    display: flex;
    margin: 0 auto 30px;
    position: relative;
`;

export const ProfileImage = styled.div`
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 50%;
`;

export const ProfileIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightgrey;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 0;
    right: 0px;
`;

export const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    background: lightgrey;
    border-radius: 50%;
`;

export default () => {
    const isUploading = useSelector(getImageUploading);
    const imagePicker = React.createRef();
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const openImagePicker = () => imagePicker.current.click();
    const uploadImage = file => {
        dispatch(actions.updloadUserImage.trigger({ file }));
    };

    return (
        <>
            <AppBar />
            <Profile>
                <ProfileHeader>
                    {isUploading ? (
                        <SpinnerWrapper>
                            <CircularProgress />
                        </SpinnerWrapper>
                    ) : (
                        <FilePicker
                            maxSize={10}
                            dims={{ minWidth: 100, minHeight: 100 }}
                            onChange={file => uploadImage(file)}
                            onError={errMsg => console.log(errMsg)}
                        >
                            <div ref={imagePicker}>
                                {user.image.public_id ? (
                                    <ProfileImage>
                                        <Image publicId={user.image.public_id} crop="scale" width="150" />
                                    </ProfileImage>
                                ) : (
                                    <Avatar style={{ width: 150, height: 150 }}>
                                        <AccountCircle style={{ fontSize: 180 }} />
                                    </Avatar>
                                )}
                            </div>
                        </FilePicker>
                    )}
                    <ProfileIcon onClick={openImagePicker}>
                        <Camera />
                    </ProfileIcon>
                </ProfileHeader>
            </Profile>
        </>
    );
};
