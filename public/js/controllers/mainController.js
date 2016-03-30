angular.module('nmtApp.controllers').
controller('MainController', ['$scope', '$filter', '$state', '$stateParams', '$rootScope', 'DashboardService', '$cookieStore', function($scope, $filter, $state, $stateParams, $rootScope, DashboardService, $cookieStore){

	$rootScope.user = {
		email: null,
		password: null,
		validated: null
	};

	$scope.loginActive = true;
	$scope.registerActive = false;
	$scope.forgotActive = false;

	$scope.loadUser = function(email, password){
		console.log('email',email);
		console.log('password',password);
		$rootScope.user.email = email;
		$rootScope.user.password = password;
		DashboardService.userLogin($rootScope.user).then(function(response){
			$rootScope.user = response;
			$cookieStore.put('user',$rootScope.loggedIn);
			if($rootScope.user.validated === true){
				$state.go('home', null, {location: true});
				//$state.go('dashboard', null, {location: true});
			}
		});
		//$state.go('dashboard', {username: username}, {location: true});
		//$state.go('welcome', {username: username}, {location: true});
	};

	$scope.activeWindow = function(window){
		console.log('hit here', window);
		if(window === 'register'){
			$scope.registerActive = true;
			$scope.loginActive = false;
			$scope.forgotActive = false;
		}else if(window === 'forgot'){
			$scope.forgotActive = true;
			$scope.loginActive = false;
			$scope.registerActive = false;
		}else{
			$scope.loginActive = true;
			$scope.registerActive = false;
			$scope.forgotActive = false;
		}
	};

	$scope.openSearch = function(){
		console.log('hit here MainController');
			angular.element('#header').addClass('search-toggled');
			//growlService.growl('Welcome back Mallinda Hollaway', 'inverse');
	};

	$scope.closeSearch = function(){
			angular.element('#header').removeClass('search-toggled');
	};

}]);