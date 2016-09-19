import * as types from '../constants/actiontypes'
import { BASE_URL } from '../constants/http'

function getProfileRequest () {
  return {
    type: types.GET_PROFILE_REQUEST,
    isFetching: true
  }
}

function getProfileSuccess(response) {
  return {
    type: types.GET_PROFILE_SUCCESS,
    isFetching: true,
    profile: response
  }
}

function getProfileError(error) {
  return {
    type: types.GET_PROFILE_ERROR,
    isFetching: false,
    error
  }
}

export function getProfile() {
  return dispatch => {
    dispatch(getProfileRequest())

    var token = localStorage.getItem('jwt_token')

    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      },
      method: "GET",
    }

    return fetch(BASE_URL + 'account/', config)
      .then(response => response.json()
      .then(json => ({ json, response })))
      .then(({ json, response }) => {
        if (!response.ok) {
          dispatch(getProfileError(json.non_field_errors[0]))
        }
        else {
          dispatch(getProfileSuccess(json))
        }
        return response
      })
      .catch(err => dispatch(getProfileError(err)))
  }
}

function updateProfileRequest() {
  return {
    type: types.UPDATE_PROFILE_REQUEST,
    isFetching: true,
  }
}

function updateProfileSuccess(profile) {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    isFetching: false,
    profile: profile
  }
}

function updateProfileError(error) {
  return {
    type: types.UPDATE_PROFILE_ERROR,
    isFetching: false,
    updateProfileError: error
  }
}

export function updateProfile(profile) {
  return dispatch => {
    dispatch(updateProfileRequest())

    var token = localStorage.getItem('jwt_token')

    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      },
      method: "PUT",
      body: JSON.stringify(profile)
    }

    return fetch(BASE_URL + 'account/', config)
      .then(response => response.json()
      .then(json => ({ json, response })))
      .then(({ json, response }) => {
        if (!response.ok) {
          dispatch(updateProfileError(json.non_field_errors[0]))
        }
        else {
          dispatch(updateProfileSuccess(json))
        }
        return response
      })
      .catch(err => dispatch(updateProfileError(err)))
  }
}
