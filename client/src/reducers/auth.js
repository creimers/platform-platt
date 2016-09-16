import * as types from '../constants/actiontypes'

export default function auth(
  state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' ? true : false,
    currentUser: localStorage.getItem('user'),
    loginErrorMessage: ''
  }, action) {

  switch(action.type) {

    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        loginErrorMessage: '',
        //user: action.userModel
      })

    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        loginErrorMessage: ''
      })

    case types.LOGIN_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        currentUser: null,
        loginErrorMessage: action.loginErrorMessage
      })

    case types.REAUTHENTICATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
      })

    case types.LOGOUT:
      console.log('heide')
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
      })

    default:
      return state
  }
}
