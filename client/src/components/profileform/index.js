import googleAutocomplete from '../google-autocomplete'

class ProfileFormCtrl {
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
          disabled: true,
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

  set profile(value) {
    this.model = angular.copy(value)
  }

  get profile() {
    return this.model
  }

  handleOnSave() {
    this.onSave({model: this.model.profile})
  }

  setLocation(model) {
    let updateModel = (model) => {
      this.model.profile.location = model.location.city.name
      this.model.profile.coords = {
        latitude: model.location.lat,
        longitude: model.location.lon
      }
    } 
    this.$timeout(updateModel(model))
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

angular.module(MODULE_NAME, [googleAutocomplete])
  .component('profileFormCmp', profileFormCmp)
  .controller('ProfileFormCtrl', ProfileFormCtrl);

export default MODULE_NAME
export { ProfileFormCtrl }
