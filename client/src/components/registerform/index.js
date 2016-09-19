import googleAutocomplete from '../google-autocomplete'
import userRole from '../user-role'

class RegisterFormCtrl {
  /* @ngInject */
  constructor($timeout) {
    this.$timeout = $timeout

    this.model = {}
    this.form = {}
    this.options = {}
    this.formFields = [
      {
        type: 'select',
        key: 'level',
        templateOptions: {
          required: true,
          label: 'Platt-Level',
          labelProp: 'level',
          valueProp: 'value',
          options: [
            {level: 'AnfängerIn', value: 'AnfängerIn'},
            {level: 'Fortgeschritten', value: 'Fortgeschritten'},
            {level: 'Platt-Profi', value: 'Platt-Profi'}
          ]
        }
      },
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

  setRole(role) {
    let updateModel = (role) => {
      this.model.role = role
    }
    this.$timeout(updateModel(role))
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

angular.module(MODULE_NAME, [googleAutocomplete, userRole])
  .component('registerFormCmp', registerFormCmp)
  .controller('RegisterFormCtrl', RegisterFormCtrl)

export default MODULE_NAME
