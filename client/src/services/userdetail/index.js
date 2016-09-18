class userDetailSrvCtrl {
  /* @ngInject */
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;

    this.contactForm = false
    this.contactText = ''
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  submitContact() {
    console.log('contact')
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
  .service('userDetailSrv', userDetailSrv);

export default MODULE_NAME;
