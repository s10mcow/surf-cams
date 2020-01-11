import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "muicss/lib/react/button";
import ReactGA from "react-ga";

const Feedback = styled.article`
    display: flex;
    flex-direction: column;
`;

export default ({ toggle }) => {
    return (
        <Feedback className="feedback">
            <Button color="primary" onClick={toggle}>
                back to video
            </Button>
            <div>
                <p>No feedback yet...</p>
            </div>
            <Button variant="fab">FS</Button>
        </Feedback>
    );
};
