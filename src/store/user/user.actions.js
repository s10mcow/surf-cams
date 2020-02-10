import { registerAction } from '../redux-utils';

import TYPES from './user.types';

const actions = {};

actions.setUser = registerAction(TYPES.SET_USER);
actions.readUser = registerAction(TYPES.READ_USER);
actions.updateUser = registerAction(TYPES.UPDATE_USER);
actions.updloadUserImage = registerAction(TYPES.UPLOAD_USER_IMAGE);
actions.updloadUserImageProgress = registerAction(TYPES.UPLOAD_USER_IMAGE_PROGRESS);
actions.logout = registerAction(TYPES.LOGOUT);

export default actions;
