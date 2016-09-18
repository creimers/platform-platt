import * as types from '../constants/actiontypes'
import { BASE_URL } from '../constants/http'

function getUsersRequest (lat, lng, location) {
  return {
    type: types.GET_USERS_REQUEST,
    isFetching: true,
    currentLocation: {lat, lng, location}
  }
}

function getUsersSuccess(response) {
  return {
    type: types.GET_USERS_SUCCESS,
    isFetching: false,
    users: response
  }
}

function getUsersError(error) {
  return {
    type: types.GET_USERS_ERROR,
    isFetching: false,
    error
  }
}

export function getUsers(role, lat, lng, location, radius) {
  return dispatch => {
    dispatch(getUsersRequest(lat, lng, location))

    var token = localStorage.getItem('jwt_token')

    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      },
      method: "GET",
    }

    let url = BASE_URL + `users/?radius=${radius}&lat=${lat}&lng=${lng}`

    return fetch(url, config)
      .then(response => response.json()
      .then(json => ({ json, response })))
      .then(({ json, response }) => {
        if (!response.ok) {
          dispatch(getUsersError(json.non_field_errors[0]))
        }
        else {
          dispatch(getUsersSuccess(json))
        }
        return response
      })
      .catch(err => dispatch(getUsersError(err)))
  }
}

function contactUserRequest () {
  return {
    type: types.CONTACT_USER_REQUEST,
    isFetching: true,
  }
}

function contactUserSuccess(response) {
  return {
    type: types.CONTACT_USER_SUCCESS,
    isFetching: false,
  }
}

function contactUserError(error) {
  return {
    type: types.CONTACT_USER_ERROR,
    isFetching: false,
    error
  }
}

export function contactUser(userId, message) {
  return dispatch => {
    dispatch(contactUserRequest())

    var token = localStorage.getItem('jwt_token')

    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      },
      method: "POST",
      body: JSON.stringify({receiver: userId, message: message})
    }

    let url = BASE_URL + 'contact/'

    return fetch(url, config)
      .then(response => response.json()
      .then(json => ({ json, response })))
      .then(({ json, response }) => {
        if (!response.ok) {
          dispatch(contactUserError(json.non_field_errors[0]))
        }
        else {
          dispatch(contactUserSuccess(json))
        }
        return response
      })
      .catch(err => dispatch(contactUserError(err)))
  }
}
