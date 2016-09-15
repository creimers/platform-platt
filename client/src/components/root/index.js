import componentRouter from '@angular/router/angular1/angular_1_router'

import services from '../../services'

import Start from '../start'
import Login from '../login'

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
      console.log('get profile')
      // call getProfile action
    }
    this.$scope.$on('login-success', getProfile)
  }

  //onLogout() {
    //this.logout(this.$router)
  //}

}

let rootCmp = {
  controller: 'RootCtrl',
  template: require('./index.pug')(),
  $routeConfig: [
    {path: '/', name: 'Index', component: 'startCmp', useAsDefault: true},
    {path: '/login', name: 'Login', component: 'loginCmp'},
    //{path: '/profile', name: 'Profile', component: 'profileCmp'},
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
  Start,
  Login
])
  .config(locationConfig)
  .component('rootCmp', rootCmp)
  .value('$routerRootComponent', 'rootCmp')
  .controller('RootCtrl', RootCtrl);

export default MODULE_NAME;
