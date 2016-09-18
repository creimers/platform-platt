import * as types from '../constants/actiontypes'

export default function users (
  state = {
    users: [],
    isFetching: false,
    getUsersError: '',
    currentLocation: {}
  },
  action) {

    switch(action.type) {
      case types.GET_USERS_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
          currentLocation: action.currentLocation
        })

      case types.GET_USERS_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          users: action.users
        })

      case types.GET_USERS_ERROR:
        return Object.assign({}, state, {
          isFetching: false,
          getUsersError: action.error
        })

      case types.CONACT_USER_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
          contactUserError: ''
        })

      case types.CONACT_USER_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          contactUserError: ''
        })

      case types.CONACT_USER_ERROR:
        return Object.assign({}, state, {
          isFetching: false,
          contactUserError: action.error
        })

      default:
        return state
    }
}
