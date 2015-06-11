angular.module('nmtApp.controllers').
controller('WorkoutsController', ['DashboardService' ,'$scope', '$filter', '$state', '$stateParams', '$rootScope', function(DashboardService, $scope, $filter, $state, $stateParams, $rootScope){ 
	
	//console.log('username',$rootScope.username);

	$scope.getExercisesByMuscleName = function(){
		console.log('hit this function fhdaslk');
		$scope.muscleName = $stateParams.name;
		DashboardService.getExercisesByMuscleName($stateParams.name).then(function(response){
			$scope.exercises = response;
		});
	};

	$scope.getExercisesByMuscleName();

}]);