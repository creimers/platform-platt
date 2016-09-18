import viewComponentCtrl from '../../controllers/viewcomponent'
import * as userActions from '../../actions/users'


class UsersCtrl extends viewComponentCtrl{
  /* @ngInject */
  constructor($rootScope, $q, jwtHelper, $ngRedux, $scope, $mdToast, $mdDialog) {
    super($rootScope, $q, jwtHelper, $ngRedux, $scope, $mdToast)

    this.$mdDialog = $mdDialog

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
    this.getUsers(this.profile.profile.role, lat, lng, location, radius)
  }

  openUserModal(user) {
    console.log('details')
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

angular.module(MODULE_NAME, [])
  .component('usersCmp', usersCmp)
  .controller('UsersCtrl', UsersCtrl);

export default MODULE_NAME;
