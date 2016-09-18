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
    isFetching: true,
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
