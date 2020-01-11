import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "muicss/lib/react/button";
import ReactGA from "react-ga";
import { FilePicker } from "react-file-picker";

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

    const setImageFromB64 = b => {
        console.log(b);
        const image = URL.createObjectURL(b);
        setImage(image);
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
