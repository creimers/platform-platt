class UserRoleCmpCtrl {
  /* @ngInject */
  constructor() {
    this.role = 'learn'
  }

  $onInit() {
    this.selectRole(this.role)
  }

  selectRole(role) {
    this.role = role
    this.onSelect({role})
  }
}

let userRoleCmp = {
  controller: 'UserRoleCmpCtrl',
  template: require('./index.pug')(),
  bindings: {
    onSelect: '&'
  }
}

const MODULE_NAME = 'user-role'

import './index.scss'

angular.module(MODULE_NAME, [
])
  .component('userRoleCmp', userRoleCmp)
  .controller('UserRoleCmpCtrl', UserRoleCmpCtrl)

export default MODULE_NAME
