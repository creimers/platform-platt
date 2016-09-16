import viewComponentCtrl from '../../controllers/viewcomponent'
import ProfileForm from '../profileform'
import * as profileActions from '../../actions/profile'


class ProfileCtrl extends viewComponentCtrl{
  /* @ngInject */
  constructor($q, jwtHelper, $ngRedux, $scope, $mdToast) {
    super($q, jwtHelper, $ngRedux, $scope, $mdToast)

    const unsubscribe = $ngRedux.connect(this._mapStateToThis, profileActions)(this)
    $scope.$on('$destroy', unsubscribe);

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

  onSave(model) {
    this.updateProfile(model).then(resp => {
      if(resp.ok) {
        this.$mdToast.showSimple('Profil aktualisiert.')
      }
    })
  }

  _loadProfile() {
    if(!this.profile.profile.email && !this.profile.isFetching && this.auth.isAuthenticated) {
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
