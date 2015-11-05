angular.module('nmtApp.controllers').
controller('WorkoutsController', ['DashboardService' ,'$scope', '$filter', '$state', '$stateParams', '$rootScope', '$location', '$cookieStore', function(DashboardService, $scope, $filter, $state, $stateParams, $rootScope, $location, $cookieStore){ 
	

	if($rootScope.loggedIn === undefined){
		$rootScope.loggedIn = $cookieStore.get('user');
	}
	
	console.log('$cookieStore.loggedIn',$cookieStore.loggedIn);

	$scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){ 
		console.log('hit here WorkoutsController'); 
		if ($rootScope.loggedIn === false && newValue != '/login'){  
			console.log('entered if');
			$location.path('/login'); 
		}
	});

	$scope.getExercisesByMuscleName = function(){
		$scope.muscleName = $stateParams.name;
		DashboardService.getExercisesByMuscleName($stateParams.name).then(function(response){
			$scope.exercises = response;
		});
	};

	$scope.getDailyStatistics = function(){
		$scope.firstLogTime = null;
		DashboardService.getDailyStatistics().then(function(response){
			$scope.dailyStatistics = response;
		});
	};

	$scope.getExercisesByMuscleName();
	$scope.getDailyStatistics();
}]);