import angular from 'angular';
import angularMessages from 'angular-messages';
import angularFormly from 'angular-formly';
import angularFormlyMaterial from 'angular-formly-material';

import angularRedux from 'ng-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

import config from './config'

import rootCmp from './components/root';

import theme from './theme'

const MODULE_NAME = 'app';

/* @ngInject */
function formlyConfig(formlyValidationMessages) {
  formlyValidationMessages.addStringMessage('required', 'Dieses Feld ist erforderlich.')
}

/* @ngInject */
function reduxConfig($ngReduxProvider) {
  $ngReduxProvider.createStoreWith(rootReducer, [thunk]) 
}

angular.module(MODULE_NAME, [
  angularMessages,
  angularFormly,
  angularFormlyMaterial,
  angularRedux,
  theme,
  config,
  rootCmp
])
.config(reduxConfig)
.run(formlyConfig)

export default MODULE_NAME;
