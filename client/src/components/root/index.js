import componentRouter from '@angular/router/angular1/angular_1_router'

import services from '../../services'

import Login from '../login'
import Profile from '../profile'
import Register from '../register'
import Start from '../start'

import * as authActions from '../../actions/auth'
import * as profileActions from '../../actions/profile'

import './index.scss';

class RootCtrl {
  /* @ngInject */
  constructor($rootRouter, $ngRedux, $scope) {
    this.$router = $rootRouter

    const unsubscribeAuth = $ngRedux.connect(this._mapToThis, authActions)(this)
    $scope.$on('$destroy', unsubscribeAuth);

    const unsubscribeProfile = $ngRedux.connect(this._mapToThis, profileActions)(this)
    $scope.$on('$destroy', unsubscribeProfile);

    this.$scope = $scope
  }


  _mapToThis(state) {
    return {
      auth: state.auth,
      profile: state.profile
    }
  }

  $onInit() {
    let getProfile = () => {
      this.getProfile()
    }
    this.$scope.$on('login-success', getProfile)
  }

  handleLogout() {
    this.logoutUser()
    this.$router.navigate(['Start'])
  }

}

let rootCmp = {
  controller: 'RootCtrl',
  template: require('./index.pug')(),
  $routeConfig: [
    {path: '/', name: 'Start', component: 'startCmp', useAsDefault: true},
    {path: '/registrieren', name: 'Register', component: 'registerCmp'},
    {path: '/login', name: 'Login', component: 'loginCmp'},
    {path: '/profil', name: 'Profile', component: 'profileCmp'},
    //{path: '/users', name: 'Users', component: 'usersCmp'},
  ]
};

const MODULE_NAME = 'component.root';

/* @ngInject */
function locationConfig($locationProvider){
  $locationProvider.html5Mode(true);
}

angular.module(MODULE_NAME, [
  'ngComponentRouter',
  services,
  Login,
  Profile,
  Register,
  Start,
])
  .config(locationConfig)
  .component('rootCmp', rootCmp)
  .value('$routerRootComponent', 'rootCmp')
  .controller('RootCtrl', RootCtrl);

export default MODULE_NAME;
