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
      role: ''
    },
    isFetching: false,
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
          profile: action.profile
        })

      case types.UPDATE_PROFILE_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        })

      case types.UPDATE_PROFILE_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          profile: action.profile
        })

      default:
        return state
    }
}
