import materialDesign from 'angular-material';


/* @ngInject */
let themeConfig = ($mdThemingProvider) => {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('indigo')
    .accentPalette('amber')
    .warnPalette('red')
};

const MODULE_NAME = 'app.theme.config';

angular.module(MODULE_NAME, [
  materialDesign
])
  .config(themeConfig);

export default MODULE_NAME;
