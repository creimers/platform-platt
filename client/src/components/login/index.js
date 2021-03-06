import loginFormCmp from '../loginform'
import * as authActions from '../../actions/auth'

class LoginCtrl {
  /* @ngInject */
  constructor($rootScope, $ngRedux, $scope, $mdToast) {
    const unsubscribe = $ngRedux.connect(this._mapStateToThis, authActions)(this)
    $scope.$on('$destroy', unsubscribe);

    this.$rootScope = $rootScope
    this.$mdToast = $mdToast
  }

  _mapStateToThis(state) {
    return {
      auth: state.auth
    }
  }

  onLogin(model) {
    this.loginUser(model)
    .then((resp)=> {
      if(resp.ok) {
        this.$mdToast.showSimple('Moin moin.')
        this.$rootScope.$broadcast('authenticated')
      }
    })
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
