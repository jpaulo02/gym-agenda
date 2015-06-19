angular.module('nmtApp.controllers').
controller('LoggerController', ['DashboardService' ,'$scope', '$filter', '$state', '$stateParams', '$rootScope', function(DashboardService, $scope, $filter, $state, $stateParams, $rootScope){ 
	
	$scope.loggedExercise = {
		workoutId: null,
		reps: null,
		weight: null,
		notes: null
	};

	$scope.logs = [];

	$scope.workoutId = $stateParams.id;
	$scope.workoutName = $stateParams.name;
	$scope.reps = null;
	$scope.weight = null;
	$scope.notes = null;
	$scope.editLog = null;

	$scope.logWorkout = function(reps, weight, notes){
		$scope.loggedExercise.workoutId = $scope.workoutId;
		$scope.loggedExercise.reps = reps;
		$scope.loggedExercise.weight = weight;
		$scope.loggedExercise.notes = notes;
		//$scope.logs.logs.push($scope.loggedExercise);
		
		if($scope.editLog){
			DashboardService.updateExercise($scope.loggedExercise).then(function(response){
				$scope.logs = response;
				$scope.editLog = false;
				console.log('logExercise',response);
			});
		}else{
			DashboardService.logExercise($scope.loggedExercise).then(function(response){
				$scope.logs = response;
				$scope.editLog = false;
				console.log('logExercise',response);
			});
		}
	};

	$scope.getLogByDateAndWorkoutId = function(){
		DashboardService.getLogByDateAndWorkoutId($scope.workoutId).then(function(response){
			$scope.logs = response;
			console.log('logs',$scope.logs);
		});
	};

	$scope.edit = function(id, weight, reps, notes, edit){
		console.log('index',index);
		console.log('weight',weight);
		console.log('reps',reps);
		console.log('notes',notes);
		console.log('true/false',edit);
		$scope.weight = weight;
		$scope.reps = reps;
		$scope.notes = notes;
		$scope.editLog = edit;
	};

	$scope.loadLog = function(){

	};

	$scope.getLogByDateAndWorkoutId($scope.workoutId);

}]);