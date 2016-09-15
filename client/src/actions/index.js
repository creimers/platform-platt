import * as types from '../constants/actiontypes'
import { BASE_URL } from '../constants/http'

function loginRequest (userModel) {
  console.log('login request')
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    userModel
  }
}

function loginSuccess(response) {
  console.log('login success')
  console.log(response)
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: true,
    isAuthenticated: false,
    loginErrorMessage: '',
    //currentUser: userModel,
    //userModel
  }
}

function loginError(error) {
  console.log('login error')
  console.log(error)
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
    console.log("let's log that sunofabitch in")
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
        console.log(response)
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

export class AuthSrv {
  /* @ngInject */
  constructor($http) {
    this.$http = $http
  }

  loginUserddd(userModel) {

    return (dispatch)=> {
      dispatch(loginRequest(userModel))

      return $http.post(BASE_URL + 'authenticate/', userModel)
        .then(response => {dispatch(loginSuccess(response.data))})
        .then(response => {dispatch(loginError(response.data))})

    }
  }

}
