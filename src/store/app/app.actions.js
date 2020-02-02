import { registerAction } from '../redux-utils';

import TYPES from './app.types';

const actions = {};

actions.initApp = registerAction(TYPES.INIT_APP);
actions.userInitialized = registerAction(TYPES.USER_INITIALIZED);

export default actions;
