//import * as actions from '../../actions/actionCreators'


/** The controller for the profile component. */
class StartCmpCtrl {
  /**
  * constructor of the StartCmpCtrl
  * @param {object} $ngRedux
  * @param {object} $scope
  **/
  /* @ngInject */
  constructor($ngRedux, $scope) {
    //this.model = {}
    //this.form = {}
    //this.options = {}

    //const unsubscribe = $ngRedux.connect(this._mapStateToThis, actions)(this)
    //$scope.$on('$destroy', unsubscribe);

    //this._loadProfile()

    this.windmills = require('../../img/windmills.svg')
    this.lighthouse = require('../../img/lighthouse.svg')
  }

  //_mapStateToThis(state) {
    //return {
      //profile: state.profile,
    //}
  //}

  /**
  * deligates the profile to the update profile action
  * @param {object} model - the profile
  **/
  //onSave(model) {
    //this.updateProfile(model)
  //}

  /**
  * gets the profile if it has not been fetched
  **/
  //_loadProfile() {
    //if(!this.profile.isFetched) {
      //this.getProfile()
    //}
  //}
}

let startCmp = {
  controller: 'StartCmpCtrl',
  template: require('./index.pug')()
};
const MODULE_NAME = 'startCmp';

import './index.scss'

angular.module(MODULE_NAME, [])
  .component('startCmp', startCmp)
  .controller('StartCmpCtrl', StartCmpCtrl);

export default MODULE_NAME;
