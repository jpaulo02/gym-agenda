angular.module('nmtApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	//Redirect to homepage
	$urlRouterProvider.when('', 'dashboard');
	$urlRouterProvider.when('/', 'dashboard');

	$urlRouterProvider.otherwise("/dashboard");

	$stateProvider
	.state('404', {
		url: '/404',
		templateUrl: '',
		data: {
			contentPages: 1,
		}
	})	
	.state('login', {
		url: '/login',
		templateUrl: 'views/login.html',
		data: {
			contentPages: 1,
		}
	})	
	.state('dashboard', {
		url: '/dashboard',
		templateUrl: 'views/dashboard.html',
		controller: 'DashboardController',
		data: {
			contentPages: 1,
		}
	})
	.state('exercise', {
		url: '/exercise/:name',
		templateUrl: 'views/exercise.html',
		controller: 'WorkoutsController',
		data: {
			contentPages: 1,
		}
	})			
	.state('log', {
		url: '/exercise/:id/:name/log',
		templateUrl: 'views/logger.html',
		controller: 'LoggerController',
		data: {
			contentPages: 1,
		}
	});		
}]);