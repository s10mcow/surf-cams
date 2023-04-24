import countries from '../../cams/beach'
import TYPES from './beaches.types'

const initalState = { countries, country: 'pt' }
console.log(initalState)
const reducer = (state = initalState, action) => {
  console.log(action)
  switch (action.type) {
    case TYPES.SET_COUNTRY_SUCCESS:
      return {
        ...state,
        country: action.payload.country
      }

    default:
      return state
  }
}

export default reducer

export const getBeaches = state =>
  state &&
  state.beaches &&
  state.beaches.countries[state.beaches.country] &&
  state.beaches.countries[state.beaches.country].beaches

export const getCountry = state =>
  state && state.beaches && state.beaches.country
