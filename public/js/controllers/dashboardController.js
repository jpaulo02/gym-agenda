angular.module('nmtApp.controllers').
controller('DashboardController', ['$scope', '$filter', '$state', '$stateParams', '$rootScope', 'DashboardService', '$location', '$cookieStore', function($scope, $filter, $state, $stateParams, $rootScope, DashboardService, $location, $cookieStore){ 
	
	$scope.username = $stateParams.username;
	$scope.muscleGroups = null;
	$scope.exercises = null;
	$scope.user = null;


	//$rootScope.loggedIn = false;
	//$cookieStore.put('user',$rootScope.loggedIn);

	console.log('$rootScope.user',$rootScope.user);


	$scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){ 
	console.log('hit here DashboardController'); 
		if (($rootScope.user.validated === null || $rootScope.user.validated === false) && newValue != '/login'){  
			console.log('entered if');
			$location.path('/login'); 
		}
	});

	$scope.getAllMuscleGroups = function(){
		DashboardService.getAllMuscleGroups().then(function(response){
			$scope.muscleGroups = response;
		});
	};

	$scope.userLogin = function(){
		DashboardService.userLogin().then(function(response){
			$scope.user = response;
		});
	};


	$(document).ready(function () {
		$('[data-toggle="offcanvas"]').click(function () {
			$('.row-offcanvas').toggleClass('active');
		});
	});

	$scope.getAllMuscleGroups();

	//http://localhost:5000/#/exercise/Biceps
	//http://localhost:5000/#/exercise/31/Barbell%20Curl/log

}]);