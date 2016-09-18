import { combineReducers  } from 'redux'
import auth from './auth'
import profile from './profile'
import register from './register'
import users from './users'

const rootReducer = combineReducers({
  auth, profile, register, users
})

export default rootReducer
