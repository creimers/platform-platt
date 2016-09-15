import loginFormCmp from '../loginform'
import * as actions from '../../actions'

class LoginCtrl {
  /* @ngInject */
  constructor($ngRedux, $scope) {
    const unsubscribe = $ngRedux.connect(this._mapStateToThis, actions)(this)
    $scope.$on('$destroy', unsubscribe);
  }

  _mapStateToThis(state) {
    return {
      auth: state.auth
    }
  }

  onLogin(model) {
    this.loginUser(model)
  }
}

let loginCmp = {
  controller: 'LoginCtrl',
  template: require('./index.pug')(),
  bindings: {
    $router: '<',
  }
};
const MODULE_NAME = 'loginCmp';

import './index.scss'

angular.module(MODULE_NAME, [loginFormCmp])
  .component('loginCmp', loginCmp)
  .controller('LoginCtrl', LoginCtrl);

export default MODULE_NAME;
export { LoginCtrl }
