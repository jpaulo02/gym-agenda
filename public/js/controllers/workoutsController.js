angular.module('nmtApp.controllers').
controller('WorkoutsController', ['DashboardService' ,'$scope', '$filter', '$state', '$stateParams', '$rootScope', function(DashboardService, $scope, $filter, $state, $stateParams, $rootScope){ 
	
	//console.log('username',$rootScope.username);

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