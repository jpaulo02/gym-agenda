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
				$log.debug('getAllMuscleGroups', response.plain());
				return self.muscleGroups;
			}, function(response){
				$log.debug('error', response);
			});
		},

		getExercisesByMuscleName: function(muscleName){
			var self = this;
			return GymService.oneUrl('muscleGroup/getExercisesByMuscleName/'+ muscleName).get().then(function(response){
				self.exercises = response;
				$log.debug('getExercisesByMuscleName', response.plain());
				return self.exercises;
			}, function(response){
				$log.debug('error', response);
			});
		},

		logExercise: function(loggedExercise){
			var self = this;
			return GymService.all('exerciseLog/logExercise').post(loggedExercise).then(function(response){
				self.exerciseLog = response;
				$log.debug('logWorkout', response.plain());
				return self.exerciseLog;
			}, function(response){
				$log.debug('error', response);
			});
		},

		getLogByDateAndWorkoutId: function(wokroutId){
			var self = this;
			return GymService.oneUrl('exerciseLog/getLogByDateAndWorkoutId/'+ wokroutId).get().then(function(response){
				self.exerciseLog = response;
				$log.debug('getLogByDateAndWorkoutId', self.exerciseLog.plain());
				return self.exerciseLog;
			}, function(response){
				$log.debug('error', response);
			});
		},

		updateLog: function(loggedExercise){
			var self = this;
			console.log('brrruuuuhh',loggedExercise);
			return GymService.all('exerciseLog/updateLog').post(loggedExercise).then(function(response){
				self.exerciseLog = response;
				$log.debug('updateLog', response.plain());
				return self.exerciseLog;
			}, function(response){
				$log.debug('error', response);
			});
		},

	};

	return DashboardService;

}]);
