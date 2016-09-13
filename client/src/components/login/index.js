import loginFormCmp from '../loginform'
//import * as actions from '../../actions/actionCreators'

/** The controller for the login component. */
class LoginCtrl {
  /**
  * constructor of the LoginCtrl
  * @param {object} $ngRedux
  * @param {object} $scope
  **/
  /* @ngInject */
  //constructor($ngRedux, $scope) {
    //const unsubscribe = $ngRedux.connect(this._mapStateToThis, actions)(this)
    //$scope.$on('$destroy', unsubscribe);
  //}

  _mapStateToThis(state) {
    return {
      auth: state.auth
    }
  }

  /**
  * deligates the user credentials to the login action
  * @param {object} model - the user's credentials: username, password
  **/
  onLogin(model) {
    this.login(model, this.$router)
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
