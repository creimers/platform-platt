//import * as actions from '../../actions/actionCreators'


/** The controller for the login form component. */
class LoginFormCtrl {
  /* @ngInject */
  constructor() {
    this.model = {}
    this.form = {}
    this.options = {}
    this.formFields = [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          required: true,
          label: 'E-Mail',
        }
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          required: true,
          label: 'Passwort'
        }
      }
    ]
  }

  /**
  * deligates the user credentials to the login action
  **/
  onLogin() {
    this.onSubmit({model: this.model})
  }
}

let loginFormCmp = {
  controller: 'LoginFormCtrl',
  template: require('./index.pug')(),
  bindings: {
    onSubmit: '&',
    isFetching: '<'
  }
};

const MODULE_NAME = 'loginFormCmp';

import './index.scss'

angular.module(MODULE_NAME, [ ])
  .component('loginFormCmp', loginFormCmp)
  .controller('LoginFormCtrl', LoginFormCtrl);

export default MODULE_NAME;
export { LoginFormCtrl }
