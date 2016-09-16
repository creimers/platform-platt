import * as types from '../constants/actiontypes'

export default function register(
  state = {
    isFetching: false,
    registerErrorMessage: '',
  }, action) {

  switch(action.type) {

    case types.REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        registerErrorMessage: '',
      })

    case types.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        registerErrorMessage: '',
      })

    case types.REGISTER_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        registerErrorMessage: action.registerErrorMessage
      })

    default:
      return state
  }
}
