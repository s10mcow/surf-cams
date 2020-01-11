import countries from '../../beaches';

const initalState = { countries, country: 'pt' };

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_COUNTRY':
            return {
                ...state,
                country: action.country,
            };

        default:
            return state;
    }
};

export default reducer;

export const getBeaches = state =>
    state &&
    state.beaches &&
    state.beaches.countries[state.beaches.country] &&
    state.beaches.countries[state.beaches.country].beaches;
