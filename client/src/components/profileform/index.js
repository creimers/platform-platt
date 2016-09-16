/** The controller for the profile form component. */
class ProfileFormCtrl {
  /**
  * constructor of the RootCtrl
  * @param {object} $timeout
  * @param {object} colorSrv
  **/
  /* @ngInject */
  constructor($timeout) {
    this.$timeout = $timeout
    this.form = {}
    this.options = {}
    this.formFields = [
      {
        key: 'first_name',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Vorname',
          required: true,
        }
      },
      {
        key: 'last_name',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Nachname',
          required: true,
        }
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          required: true,
          disabled: true,
          label: 'E-Mail-Adresse',
        }
      },
      {
        key: 'username',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Benutzername',
          required: true,
        }
      },
      {
        key: 'location',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Ort',
          required: true,
        }
      },
      {
        key: 'personal_description',
        type: 'textarea',
        templateOptions: {
          grow: true,
          rows: 5,
          label: 'Kurzvorstellung'
        }
      }
    ]

    this.colorOptions = {format: 'hex'}
  }

  /**
  * profile setter. copies profile object to this.model
  * @param {object} value - the profile binding
  **/
  set profile(value) {
    this.model = angular.copy(value)
  }

  /**
  * profile getter
  **/
  get profile() {
    return this.model
  }

  /**
  * deligates the profile to the onSave binding
  **/
  handleOnSave() {
    this.onSave({model: this.model.profile})
  }

}

let profileFormCmp = {
  controller: 'ProfileFormCtrl',
  template: require('./index.pug')(),
  bindings: {
    profile: '<',
    isFetching: '<',
    onSave: '&'
  }
};
const MODULE_NAME = 'profileFormCmp';

import './index.scss'

angular.module(MODULE_NAME, [  ])
  .component('profileFormCmp', profileFormCmp)
  .controller('ProfileFormCtrl', ProfileFormCtrl);

export default MODULE_NAME
export { ProfileFormCtrl }
