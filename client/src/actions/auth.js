import * as types from '../constants/actiontypes'
import { BASE_URL } from '../constants/http'

// LOGIN

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
    isFetching: false,
    isAuthenticated: true,
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
        if (response.ok) {
          dispatch(loginSuccess(json))
        }
        else {
          dispatch(loginError(json.non_field_errors[0]))
        }
        return response
      })
      .catch(err => dispatch(loginError(err)))
  }
}

export function logoutUser() {
  localStorage.removeItem('jwt_token')
  return {
    type: types.LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    loginErrorMessage: '',
  }
}

function reauthenticateRequest() {
  return {
    type: types.REAUTHENTICATE_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  }
}

export function reauthenticateSuccess(response) {
  localStorage.setItem('jwt_token', response.token)
  return {
    type: types.REAUTHENTICATE_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
  }
}

function reauthenticateError() {
  return {
    type: types.REAUTHENTICATE_ERROR,
    isFetching: false,
    isAuthenticated: false,
  }
}

export function reauthenticate() {
  return dispatch => {
    dispatch(reauthenticateRequest())

    var token = localStorage.getItem('jwt_token')
    var config = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({token: token})
    }

    return fetch(BASE_URL + 'reauthenticate/', config)
      .then(response => response.json()
      .then(json => ({ json, response })))
      .then(({ json, response }) => {
        if (response.ok) {
          dispatch(reauthenticateSuccess(json))
        }
        else {
          dispatch(reauthenticateError(json.non_field_errors[0]))
        }
        return response
      })
      .catch(err => dispatch(reauthenticateError(err)))
  }
}
