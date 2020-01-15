import { registerAction } from '../redux-utils';

import TYPES from './feedback.types';

const actions = {};

actions.createMedia = registerAction(TYPES.CREATE_MEDIA);
actions.createMediaProgress = registerAction(TYPES.CREATE_MEDIA_PROGRESS);
actions.setAllMedia = registerAction(TYPES.SET_ALL_MEDIA);
actions.fetchAllMedia = registerAction(TYPES.FETCH_ALL_MEDIA);

export default actions;
