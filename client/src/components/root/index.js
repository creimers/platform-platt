import componentRouter from '@angular/router/angular1/angular_1_router'

import services from '../../services'

import Login from '../login'
import Profile from '../profile'
import Start from '../start'

import * as actions from '../../actions'

import './index.scss';

class RootCtrl {
  /* @ngInject */
  constructor($rootRouter, $ngRedux, $scope) {
    this.$router = $rootRouter

    const unsubscribe = $ngRedux.connect(this._mapStateToThis, actions)(this)
    $scope.$on('$destroy', unsubscribe);
    this.$scope = $scope
  }


  _mapStateToThis(state) {
    return state
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
    {path: '/login', name: 'Login', component: 'loginCmp'},
    {path: '/profile', name: 'Profile', component: 'profileCmp'},
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
  Start,
])
  .config(locationConfig)
  .component('rootCmp', rootCmp)
  .value('$routerRootComponent', 'rootCmp')
  .controller('RootCtrl', RootCtrl);

export default MODULE_NAME;
