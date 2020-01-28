import isBefore from 'date-fns/isBefore';
export const getCreateMediaProgress = state => [
    state && state.feedback && state.feedback.createMediaProgress * 100,
    state && state.feedback && state.feedback.createMediaWorking,
];

export const getMediaByName = (state, name) => {
    if (name) {
        return (
            state &&
            state.feedback &&
            state.feedback.allMedia
                .filter(({ data }) => data.tags.indexOf(name) !== -1)
                .sort((a, b) => {
                    if (isBefore(a.created_at, b.created_at)) return 1;
                    if (!isBefore(a.created_at, b.created_at)) return -1;
                    return 0;
                })
        );
    }
    return state && state.feedback && state.feedback.allMedia;
};

export const getSelectedFeedback = state => state && state.feedback && state.feedback.selected;

export const getFetchingMedia = state => state && state.feedback && state.feedback.fetchingMedia;

export const getShowFeedback = state => state && state.feedback && state.feedback.showFeedback;
