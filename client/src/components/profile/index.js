import viewComponentCtrl from '../../controllers/viewcomponent'
import ProfileForm from '../profileform'
import * as actions from '../../actions'


/** The controller for the profile component. */
class ProfileCtrl extends viewComponentCtrl{
  /**
  * constructor of the ProfileCtrl
  * @param {object} $ngRedux
  * @param {object} $scope
  **/
  /* @ngInject */
  constructor($q, jwtHelper, $ngRedux, $scope) {
    super($q, jwtHelper, $ngRedux, $scope)

    this.requiresAuthentication = true
  }

  $routerOnActivate(next, prev) {
    super.$routerOnActivate(next, prev).then(
      () => this._loadProfile()
    )
  }

  _mapStateToThis(state) {
    return {
      profile: state.profile,
      auth: state.auth,
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
    if(!this.profile.email && !this.profile.isFetching && this.auth.isAuthenticated) {
      this.getProfile()
    }
  }
}

let profileCmp = {
  controller: 'ProfileCtrl',
  template: require('./index.pug')(),
  bindings: {
    $router: '<',
  }
};
const MODULE_NAME = 'profileCmp';

import './index.scss'

angular.module(MODULE_NAME, [ProfileForm])
  .component('profileCmp', profileCmp)
  .controller('ProfileCtrl', ProfileCtrl);

export default MODULE_NAME;
