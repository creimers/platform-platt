import RegisterForm from '../registerform'
import * as registerActions from '../../actions/register'

class RegisterCtrl {
  /* @ngInject */
  constructor($ngRedux, $scope, $mdToast) {
    const unsubscribe = $ngRedux.connect(this._mapStateToThis, registerActions)(this)
    $scope.$on('$destroy', unsubscribe);

    this.$mdToast = $mdToast
  }

  _mapStateToThis(state) {
    return {
      auth: state.auth,
      register: state.register,
    }
  }

  onRegister(model) {
    this.registerUser(model)
    .then((resp)=> {
      if(resp.ok) {
        this.$mdToast.showSimple('Das hat geklappt. Du kannst dich anmelden.')
        this.$router.navigate(['Login'])
      }
    })
  }
}

let registerCmp = {
  controller: 'RegisterCtrl',
  template: require('./index.pug')(),
  bindings: {
    $router: '<',
  }
}

const MODULE_NAME = 'registerCmp'

import './index.scss'

angular.module(MODULE_NAME, [RegisterForm])
  .component('registerCmp', registerCmp)
  .controller('RegisterCtrl', RegisterCtrl)

export default MODULE_NAME
