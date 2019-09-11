import { css } from 'styled-components';

export default css`
    html {
        overflow-x: hidden;
    }

    body {
        @import url('https://fonts.googleapis.com/css?family=Roboto');
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        min-height: 100vh;
        font-family: 'Roboto', sans-serif;
    }

    li {
        list-style: none;
        font-size: 24px;
    }

    a {
        display: block;
        text-decoration: none;
    }

    .links {
        display: flex;
        justify-content: center;
    }

    .link {
        background-color: #285aff;
        transition: all 0.2s ease-in-out;
        margin: 0 5px;
        cursor: pointer;

        &:hover {
            background-color: #2735ff;
        }

        &--active {
            background-color: #7a7cff;
        }

        a {
            color: white;
            padding: 10px 20px;
        }
    }

    .page {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        width: 100vw;
        overflow: auto;
        min-height: 100vh;
        overflow-x: hidden;

        &__header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 65px;
            width: 100%;
            background-color: #777777;
            color: white;
            padding-bottom: 10px;
            h1 {
                margin-left: 30px;
                font-size: 24px;
            }
        }
    }

    #wg_target_div_512670_72189470 {
        display: flex !important;
        justify-content: center;
        overflow: auto !important;
    }

    .player {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: darkgray;
        box-shadow: 0 27px 55px 0 rgba(0, 0, 0, 0.3), 0 17px 17px 0 rgba(0, 0, 0, 0.15);
        position: relative;

        &:hover {
            .player__delete {
                transform: translateX(0);
                opacity: 1;
            }
        }

        &__error {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            margin-top: 20px;

            div {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                width: 120px;
                height: 120px;
                background-color: #dc3545;
                color: white;
                font-weight: bold;
            }
        }

        &__content {
            height: 0;
            flex: 1;
            width: 100%;
            overflow: hidden;

            video {
                width: 100% !important;
                height: auto !important;
            }
        }

        &__footer {
            width: 96%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 10px;
            min-height: 50px;
            max-height: 0;

            &__uncollapsed {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                .mui-btn:focus,
                .mui-btn:hover {
                    background-color: transparent;
                }
            }

            .mui-select {
                width: 100%;
            }
        }
        &__toggle-play {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -27.5px !important;
            margin-left: -27.5px !important;
        }

        &__delete {
            transform: translateX(100%);
            opacity: 0;
            position: absolute;
            top: 0;
            right: 0;
        }

        h2 {
            color: white;
            margin-left: 2%;
        }
    }

    .players__wrapper {
        display: flex;
        flex-direction: column;
        padding: 5px;
        width: 97%;
        overflow: hidden;
        & > .mui-btn {
            margin-top: 30px;
        }
    }

    .players {
        &--single {
            display: flex;
        }
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
    }

    @media (max-width: 960px) {
        .players {
            grid-template-columns: repeat(1, 1fr);
        }
    }
`;
