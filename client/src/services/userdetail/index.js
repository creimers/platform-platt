import * as usersActions from '../../actions/users'

class userDetailSrvCtrl {
  /* @ngInject */
  constructor($mdDialog, $ngRedux, $scope, profileSrv) {
    const unsubscribe = $ngRedux.connect(this._mapStateToThis, usersActions)(this)
    $scope.$on('$destroy', unsubscribe);

    this.$mdDialog = $mdDialog
    this.profileSrv = profileSrv

    this.contactForm = false
    this.contactText = ''

    this.profileComplete = this.profileSrv.isProfileComplete(this.profile.profile)
  }

  _mapStateToThis(state) {
    return {
      users: state.users,
      profile: state.profile
    }
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  submitContact() {
    this.contactUser(this.user.id, this.contactText).then(
      (resp)=> {
        if(resp && resp.ok) {
          this.$mdDialog.hide() 
        }
        else {
          this.$mdDialog.cancel({error: response})
        }
      }
    )
  }

  toggleContactForm() {
    this.contactForm = !this.contactForm
    this.contactText = ''
  }

}

class userDetailSrv {
  /* @ngInject */
  constructor($mdDialog, $mdMedia) {
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
  }

  openModal(user) {
    return this.$mdDialog.show({
      template: require('./index.pug')(),
      escapeToClose: true,
      controller: 'userDetailSrvCtrl',
      bindToController: true,
      controllerAs: '$ctrl',
      fullscreen: this.$mdMedia('xs') || this.$mdMedia('sm'),
      locals: {user}
    });
  }
} 

const MODULE_NAME = 'app.services.loginModal.service';
angular.module(MODULE_NAME, [])
  .controller('userDetailSrvCtrl', userDetailSrvCtrl)
  .service('userDetailSrv', userDetailSrv)

export default MODULE_NAME
