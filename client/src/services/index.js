import { HttpSrv } from './http'

const MODULE_NAME = 'services'

angular.module(MODULE_NAME, [])
  .service('httpSrv', HttpSrv)

export default MODULE_NAME
