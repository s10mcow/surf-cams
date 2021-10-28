import { registerAction } from '../redux-utils';

import TYPES from './beaches.types';

const actions = {};

actions.setCountry = registerAction(TYPES.SET_COUNTRY);


export default actions;
