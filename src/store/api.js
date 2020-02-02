const createCloudinaryMedia = async file => {};

const createMedia = async media => {
    try {
        const response = await fetch('/.netlify/functions/media-create', {
            body: JSON.stringify(media),
            method: 'POST',
        });

        return response.json();
    } catch (e) {
        return console.log(e);
    }
};

const fetchAllMedia = async () => {
    try {
        const response = await fetch('/.netlify/functions/media-fetch-all', {
            method: 'GET',
        });

        return response.json();
    } catch (e) {
        return console.log(e);
    }
};

const readUser = async id => {
    try {
        const response = await fetch(`/.netlify/functions/user-read/${id}`, {
            method: 'GET',
        });

        return response.status < 500 ? response.json() : new Error(response);
    } catch (e) {
        return console.log(e);
    }
};
const createUser = async user => {
    try {
        const response = await fetch(`/.netlify/functions/user-create`, {
            method: 'POST',
            body: JSON.stringify(user),
        });

        return response.status === 200 ? response.json() : new Error(response);
    } catch (e) {
        return console.log(e);
    }
};

const patchUser = async patch => {
    try {
        const response = await fetch(`/.netlify/functions/user-patch/${patch.ref}`, {
            method: 'POST',
            body: JSON.stringify(patch.data),
        });

        return response.status === 200 ? response.json() : new Error(response);
    } catch (e) {
        return console.log(e);
    }
};

export default {
    createMedia,
    fetchAllMedia,
    createCloudinaryMedia,
    readUser,
    createUser,
    patchUser,
};
