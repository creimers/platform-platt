import ProfileForm from '../profileform'
import * as actions from '../../actions'


/** The controller for the profile component. */
class ProfileCtrl {
  /**
  * constructor of the ProfileCtrl
  * @param {object} $ngRedux
  * @param {object} $scope
  **/
  /* @ngInject */
  constructor($ngRedux, $scope) {
    const unsubscribe = $ngRedux.connect(this._mapStateToThis, actions)(this)
    $scope.$on('$destroy', unsubscribe);
  }

  $onInit() {
    this._loadProfile()
  }

  _mapStateToThis(state) {
    return {
      profile: state.profile,
    }
  }

  /**
  * deligates the profile to the update profile action
  * @param {object} model - the profile
  **/
  onSave(model) {
    this.updateProfile(model)
  }

  /**
  * gets the profile if it has not been fetched
  **/
  _loadProfile() {
    if(!this.profile.email && !this.profile.isFetching) {
      this.getProfile()
    }
  }
}

let profileCmp = {
  controller: 'ProfileCtrl',
  template: require('./index.pug')()
};
const MODULE_NAME = 'profileCmp';

import './index.scss'

angular.module(MODULE_NAME, [ProfileForm])
  .component('profileCmp', profileCmp)
  .controller('ProfileCtrl', ProfileCtrl);

export default MODULE_NAME;
