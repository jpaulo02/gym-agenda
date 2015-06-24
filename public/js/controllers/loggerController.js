angular.module('nmtApp.controllers').
controller('LoggerController', ['DashboardService' ,'$scope', '$filter', '$state', '$stateParams', '$rootScope', '$timeout', '$interval', function(DashboardService, $scope, $filter, $state, $stateParams, $rootScope, $timeout, $interval){ 
	
	$scope.loggedExercise = {
		id: null,
		workoutId: null,
		reps: null,
		weight: null,
		notes: null
	};

	$scope.logs = [];

	$scope.workoutId = $stateParams.id;
	$scope.workoutName = $stateParams.name;
	$scope.logId = null;
	$scope.reps = null;
	$scope.weight = null;
	$scope.notes = null;
	$scope.editLog = false;
	$scope.timeRemaining = 60;

	$scope.logWorkout = function(reps, weight, notes){
		$scope.loggedExercise.id = $scope.logId;
		$scope.loggedExercise.workoutId = $scope.workoutId;
		$scope.loggedExercise.reps = reps;
		$scope.loggedExercise.weight = weight;
		$scope.loggedExercise.notes = notes;
		//$scope.logs.logs.push($scope.loggedExercise);
		
		if($scope.editLog){
			DashboardService.updateLog($scope.loggedExercise).then(function(response){
				$scope.logs = response;
				$scope.editLog = false;
				return;
			});
		}else{
			DashboardService.logExercise($scope.loggedExercise).then(function(response){
				$scope.logs = response;
				$scope.editLog = false;
			});
		}
	};

	$scope.getLogByDateAndWorkoutId = function(){
		DashboardService.getLogByDateAndWorkoutId($scope.workoutId).then(function(response){
			$scope.logs = response;
		});
	};

	$scope.updateLog = function(id, weight, reps, notes, edit){
		$scope.logId = id;
		$scope.weight = Number(weight);
		$scope.reps = Number(reps);
		$scope.notes = notes;
		$scope.editLog = edit;
	};

	$scope.loadLog = function(){

	};

	$scope.startTimer = function(){
		if($scope.timeRemaining !== 60){
			$scope.timeRemaining = 60;
			return;
		}

		$interval($scope.minusOne, 1000, [60]);
	};

	$scope.minusOne = function(){
		$scope.timeRemaining = $scope.timeRemaining-1;
		if($scope.timeRemaining === 0){
			var audio = new Audio('http://soundbible.com/mp3/glass_ping-Go445-1207030150.mp3');
			audio.play();
			$scope.timeRemaining = 60;
			return;
		}
	};

	$scope.getLogByDateAndWorkoutId($scope.workoutId);

}]);