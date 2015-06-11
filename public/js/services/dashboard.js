angular.module('nmtApp.services').
factory('DashboardService', ['$log', 'GymService', function($log, GymService){

	var DashboardService = {

		muscleGroups: null,
		exercises: null,
		exerciseLog: null,

		getAllMuscleGroups: function(){
			var self = this;
			return GymService.oneUrl('muscleGroup/allMuscles').get().then(function(response){
				self.muscleGroups = response;
				$log.debug('getAllMuscleGroups', self.muscleGroups);
				return self.muscleGroups;
			}, function(response){
				$log.debug('error', response);
			});
		},

		getExercisesByMuscleName: function(muscleName){
			var self = this;
			return GymService.oneUrl('muscleGroup/getExercisesByMuscleName/'+ muscleName).get().then(function(response){
				self.exercises = response;
				$log.debug('getExercisesByMuscleName', self.exercises);
				return self.exercises;
			}, function(response){
				$log.debug('error', response);
			});
		},

		logExercise: function(loggedExercise){
			var self = this;
			return GymService.all('exerciseLog/logExercise').post(loggedExercise).then(function(response){
				self.exerciseLog = response;
				$log.debug('logWorkout', response);
				return self.exerciseLog;
			}, function(response){
				$log.debug('error', response);
			});
		},

		getLogByDateAndWorkoutId: function(wokroutId){
			var self = this;
			return GymService.oneUrl('exerciseLog/getLogByDateAndWorkoutId/'+ wokroutId).get().then(function(response){
				self.exerciseLog = response;
				$log.debug('getLogByDateAndWorkoutId', self.exerciseLog);
				return self.exerciseLog;
			}, function(response){
				$log.debug('error', response);
			});
		}

	};

	return DashboardService;

}]);
