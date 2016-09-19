import * as types from '../constants/actiontypes'

export default function profile (
  state = {
    profile: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      personal_description: '',
      coords: {},
      location: '',
      role: '',
      isComplete: false
    },
    isFetching: false,
    updateProfileError: ''
  },
  action) {

    switch(action.type) {
      case types.GET_PROFILE_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        })

      case types.GET_PROFILE_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          profile: action.profile,
          isComplete: action.isComplete
        })

      case types.GET_PROFILE_ERROR:
        return Object.assign({}, state, {
          isFetching: false,
          error: action.error
        })

      case types.UPDATE_PROFILE_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        })

      case types.UPDATE_PROFILE_ERROR:
        return Object.assign({}, state, {
          isFetching: true,
          updateProfileError: action.error
        })

      case types.UPDATE_PROFILE_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          profile: action.profile,
          isComplete: action.isComplete
        })

    case types.LOGOUT:
      return Object.assign({}, state, {
        isFetching: false,
        profile: {}
      })

      default:
        return state
    }
}
