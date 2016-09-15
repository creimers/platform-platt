import * as types from '../constants/actiontypes'
import { BASE_URL } from '../constants/http'

function loginRequest (userModel) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    userModel
  }
}

function loginSuccess(response) {
  localStorage.setItem('jwt_token', response.token)
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: true,
    isAuthenticated: false,
    loginErrorMessage: '',
  }
}

function loginError(error) {
  return {
    type: types.LOGIN_ERROR,
    isFetching: false,
    isAuthenticated: false,
    loginErrorMessage: 'Falsche E-Mail/Passwort-Kombination',
    error
  }
}

export function loginUser(userModel) {
  return dispatch => {
    dispatch(loginRequest(userModel))
    var config = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(userModel)
    }

    return fetch(BASE_URL + 'authenticate/', config)
      .then(response => response.json()
      .then(json => ({ json, response })))
      .then(({ json, response }) => {
        if (!response.ok) {
          dispatch(loginError(json.non_field_errors[0]))
        }
        else {
          dispatch(loginSuccess(json))
        }
        return response
      })
      .catch(err => dispatch(loginError(err)))
  }
}
