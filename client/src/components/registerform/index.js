import googleAutocomplete from '../google-autocomplete'

class RegisterFormCtrl {
  /* @ngInject */
  constructor($timeout) {
    this.$timeout = $timeout

    this.model = {}
    this.form = {}
    this.options = {}
    this.formFields = [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          required: true,
          label: 'E-Mail',
        }
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          required: true,
          label: 'Passwort'
        }
      }
    ]
  }

  /**
  * deligates the user credentials to the register action
  **/
  onRegister() {
    this.onSubmit({model: this.model})
  }

  setLocation(model) {
    let updateModel = (model) => {
      this.model.location = model.location.city.name
      this.model.coords = {
        latitude: model.location.lat,
        longitude: model.location.lon
      }
    } 
    this.$timeout(updateModel(model))
  }
}

let registerFormCmp = {
  controller: 'RegisterFormCtrl',
  template: require('./index.pug')(),
  bindings: {
    onSubmit: '&',
    isFetching: '<'
  }
};

const MODULE_NAME = 'registerFormCmp';

import './index.scss'

angular.module(MODULE_NAME, [googleAutocomplete])
  .component('registerFormCmp', registerFormCmp)
  .controller('RegisterFormCtrl', RegisterFormCtrl)

export default MODULE_NAME
