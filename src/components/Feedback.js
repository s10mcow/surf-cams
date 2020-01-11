import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "muicss/lib/react/button";
import ReactGA from "react-ga";
import { FilePicker } from "react-file-picker";
import request from "superagent";
import Config from "../config/config";
import { CameraAlt } from "@material-ui/icons";

const Feedback = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    button input {
        display: none;
    }
`;

export const ProfileImage = styled.div`
    display: flex;
    background-image: ${props => `url(${props.url})`};
    width: 100%;
    height: 100%;
    background-color: ${props => (props.url ? "green" : "red")};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

export default ({ toggle }) => {
    const fileRef = React.createRef();
    const imagePicker = React.createRef();
    const [image, setImage] = React.useState(null);
    const openFS = () => {
        fileRef.current.click();
    };

    const onPhotoUploadProgress = (id, fileName, progress) => {
        console.log(id, fileName, progress);
    };

    const onPhotoUploaded = (id, fileName, response) => {
        console.log(id, fileName, response);
    };

    const setImageFromB64 = file => {
        const image = URL.createObjectURL(file);
        setImage(image);

        const url = `https://api.cloudinary.com/v1_1/${Config.cloud_name}/upload`;

        const fileName = file.name;
        var photoId = new Date();
        request
            .post(url)
            .field("upload_preset", Config.upload_preset)
            .field("file", file)
            .field("tags", "myphotoalbum")
            .field("context", fileName ? `photo=${fileName}` : "")
            .on("progress", progress =>
                onPhotoUploadProgress(photoId, file.name, progress)
            )
            .end((error, response) => {
                onPhotoUploaded(photoId, fileName, response);
            });
    };
    return (
        <Feedback className="feedback">
            <Button color="primary" onClick={toggle}>
                back to video
            </Button>

            {image && <ProfileImage ref={imagePicker} url={image} />}

            <FilePicker
                maxSize={10}
                dims={{ minWidth: 100, minHeight: 100 }}
                onChange={base64 => setImageFromB64(base64)}
                onError={errMsg => console.log(errMsg)}
            >
                <Button variant="fab">
                    <CameraAlt />
                </Button>
            </FilePicker>
        </Feedback>
    );
};
