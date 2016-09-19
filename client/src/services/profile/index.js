class profileSrv {
  /* @ngInject */
  constructor() {
  }

  isProfileComplete(profile){
    let properties = [
      'first_name', 'last_name', 'personal_description', 'level'
    ]
    return properties.every((o)=> typeof profile[o] !== 'undefined' && profile[o] !== '')
  }
} 

const MODULE_NAME = 'profileSrv'
angular.module(MODULE_NAME, [])
  .service('profileSrv', profileSrv)

export default MODULE_NAME
