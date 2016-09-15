import { AuthSrv } from '../actions'
import { HttpSrv } from './http'

const MODULE_NAME = 'services'

angular.module(MODULE_NAME, [])
  .service('authSrv', AuthSrv)
  .service('httpSrv', HttpSrv)

export default MODULE_NAME
