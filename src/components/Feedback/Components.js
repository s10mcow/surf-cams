import styled from 'styled-components';

export const Feedback = styled.article`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    .feedback__back {
        margin-right: auto;
    }

    .feeback__camera {
        flex: 1;
    }

    button input {
        display: none;
    }

    .feedback__footer {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        max-height: 40px;
        height: 40px;
        background: #232b2b;

        svg {
            font-size: 25px;
            fill: white;
        }
    }
`;

export const UploadingImage = styled.div`
    display: flex;
    flex: 1;
    background-image: ${props => `url(${props.url})`};
    width: 100vw;
    height: calc(100vw + 100px);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 1;
`;

export const UploadingImageWrapper = styled.div`
    display: flex;
    flex: 1;
    position: relative;
    overflow: hidden;
    .CircularProgress {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -30px;
        margin-top: -30px;
    }
`;

export const MediaList = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 650px;
    width: 100%;
`;
