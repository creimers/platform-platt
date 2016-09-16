import * as types from '../constants/actiontypes'
import { BASE_URL } from '../constants/http'

function registerRequest (userModel) {
  return {
    type: types.REGISTER_REQUEST,
    isFetching: true,
    userModel
  }
}

function registerSuccess(response) {
  return {
    type: types.REGISTER_SUCCESS,
    isFetching: false,
    registerErrorMessage: '',
  }
}

function registerError(error) {
  return {
    type: types.REGISTER_ERROR,
    isFetching: false,
    registerErrorMessage: error,
  }
}

export function registerUser(userModel) {
  return dispatch => {
    dispatch(registerRequest(userModel))
    var config = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(userModel)
    }

    return fetch(BASE_URL + 'register/', config)
      .then(response => response.json()
      .then(json => ({ json, response })))
      .then(({ json, response }) => {
        if (response.ok) {
          dispatch(registerSuccess(json))
        }
        else {
          dispatch(registerError(json.non_field_errors[0]))
        }
        return response
      })
      .catch(err => dispatch(registerError(err)))
  }
}
