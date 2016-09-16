import { combineReducers  } from 'redux'
import auth from './auth'
import profile from './profile'
import register from './register'

const rootReducer = combineReducers({
  auth, profile, register
})

export default rootReducer
