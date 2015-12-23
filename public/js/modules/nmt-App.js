angular.module('nmtApp.filters', []);
angular.module('nmtApp.services', []);
angular.module('nmtApp.directives', []);
angular.module('nmtApp.controllers', []);
angular.module('nmtApp', [
	'nmtApp.filters',
	'nmtApp.services',
	'nmtApp.directives',
	'nmtApp.controllers',
	'ngAnimate',
    'ngCookies',
	'ngSanitize',
	'ui.router',
	'ui.bootstrap',
	'restangular',
	'highcharts-ng',
	'ngResource',
	'ngTouch',
	'mwl.calendar',
	'angular-loading-bar'
]);