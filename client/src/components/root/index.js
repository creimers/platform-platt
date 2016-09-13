import componentRouter from '@angular/router/angular1/angular_1_router'
import Start from '../start'
//import Login from '../login'
//import Profile from '../profile'
//import Users from '../users'

//import * as actions from '../../actions/actionCreators'

import './index.scss';

class RootCtrl {
  /* @ngInject */
  //constructor($rootRouter, $ngRedux, $scope) {
    //this.$router = $rootRouter
    //const unsubscribe = $ngRedux.connect(this._mapStateToThis, actions)(this)
  //}

  //_mapStateToThis(state) {
    //return state
  //}

  onLogout() {
    //this.logout(this.$router)
  }
}

let rootCmp = {
  controller: 'RootCtrl',
  template: require('./index.pug')(),
  $routeConfig: [
    {path: '/', name: 'Index', component: 'startCmp', useAsDefault: true},
    //{path: '/login', name: 'Login', component: 'loginCmp', useAsDefault: true},
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
  Start,
])
  .config(locationConfig)
  .component('rootCmp', rootCmp)
  .value('$routerRootComponent', 'rootCmp')
  .controller('RootCtrl', RootCtrl);

export default MODULE_NAME;
