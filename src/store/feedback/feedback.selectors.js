import isBefore from 'date-fns/isBefore';
export const getCreateMediaProgress = state => [
    state && state.feedback && state.feedback.createMediaProgress * 100,
    state && state.feedback && state.feedback.createMediaWorking,
];

export const getMediaByName = (state, name) =>
    state &&
    state.feedback &&
    state.feedback.allMedia
        .filter(({ data }) => data.tags.indexOf(name) !== -1)
        .sort((a, b) => {
            if (isBefore(a.created_at, b.created_at)) return 1;
            if (!isBefore(a.created_at, b.created_at)) return -1;
            return 0;
        });
