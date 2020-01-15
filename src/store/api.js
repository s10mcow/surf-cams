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

export default {
    createMedia,
    fetchAllMedia,
    createCloudinaryMedia,
};
