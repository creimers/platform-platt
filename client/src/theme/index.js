import themeConfig from './config';


// CSS IMPORTS
import 'angular-material/angular-material.min.css';
import './index.scss';


const MODULE_NAME = 'app.theme';

angular.module(MODULE_NAME, [
  themeConfig
]);

export default MODULE_NAME;
