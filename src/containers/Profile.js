import React from 'react';
import AppBar from '../components/AppBar';
import styled, { keyframes } from 'styled-components';
import { FilePicker } from 'react-file-picker';
import Camera from '@material-ui/icons/CameraAlt';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../store/user/user.actions';
import { Image } from 'cloudinary-react';
import { getUser, getImageUploading } from '../store/user/user.selectors';

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

export const spinner = keyframes`
0% {
  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
}
5%,
95% {
  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
}
10%,
59% {
  box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
}
20% {
  box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
}
38% {
  box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
}
100% {
  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
}
`;

export const round = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
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

export const UploadSpinner = styled.div`
    color: #ffffff;
    font-size: 24px;
    text-indent: -9999em;
    overflow: hidden;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin: 72px auto;
    position: relative;
    transform: translateZ(0);
    animation: ${spinner} 1.7s infinite ease, ${round} 1.7s infinite ease;
`;

export default () => {
    const isUploading = useSelector(getImageUploading);
    const imagePicker = React.createRef();
    const user = useSelector(getUser);
    const [image, setImage] = React.useState(user.image.url);
    const dispatch = useDispatch();
    const openImagePicker = () => imagePicker.current.click();
    const uploadImage = file => {
        const mediaUrl = URL.createObjectURL(file);
        setImage(mediaUrl);
        dispatch(actions.updloadUserImage.trigger({ file }));
    };

    return (
        <>
            <AppBar />
            <Profile>
                <ProfileHeader>
                    {isUploading ? (
                        <SpinnerWrapper>
                            <UploadSpinner />
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
                                        <Image publicId={user.image.public_id} crop="scale" width="150" /> />
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
