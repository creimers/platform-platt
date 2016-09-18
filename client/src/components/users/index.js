import viewComponentCtrl from '../../controllers/viewcomponent'
import * as userActions from '../../actions/users'

import userDetailSrvCtrl from '../../services/userdetail'


class UsersCtrl extends viewComponentCtrl{
  /* @ngInject */
  constructor($rootScope, $q, jwtHelper, $ngRedux, $scope, $mdToast, userDetailSrv) {
    super($rootScope, $q, jwtHelper, $ngRedux, $scope, $mdToast)

    this.userDetailSrv = userDetailSrv

    const unsubscribe = $ngRedux.connect(this._mapStateToThis, userActions)(this)
    $scope.$on('$destroy', unsubscribe);

    this.requiresAuthentication = true
  }

  $routerOnActivate(next, prev) {
    super.$routerOnActivate(next, prev)
  }

  _mapStateToThis(state) {
    return {
      users: state.users,
      auth: state.auth,
      profile: state.profile,
    }
  }

  searchForUsers(model) {
    let location = model.location.city.name
    let lat = model.location.lat
    let lng = model.location.lon
    let radius = 50

    let role = this.profile.profile.role === 'learn' ? 'teach': 'learn'
    this.getUsers(role, lat, lng, location, radius)
  }

  openUserModal(user) {
    this.userDetailSrv.openModal(user).then(
      () => this.$mdToast.showSimple('Anfrage gesendet!'),
      () => this.$mdToast.showSimple('Fehler! Anfrage nicht gesendet!')
    )
  }

}

let usersCmp = {
  controller: 'UsersCtrl',
  template: require('./index.pug')(),
  bindings: {
    $router: '<',
  }
};
const MODULE_NAME = 'usersCmp';

import './index.scss'

angular.module(MODULE_NAME, [userDetailSrvCtrl])
  .component('usersCmp', usersCmp)
  .controller('UsersCtrl', UsersCtrl);

export default MODULE_NAME;
