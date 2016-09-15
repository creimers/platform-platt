import angularJwt from 'angular-jwt'
import jwtInterceptorConfig from './jwt'

const MODULE_NAME = 'config'

angular.module(MODULE_NAME, [angularJwt])
  .config(jwtInterceptorConfig)

export default MODULE_NAME
