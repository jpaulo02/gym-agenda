angular.module('nmtApp.services').
factory('DashboardService', ['$log', 'GymService', function($log, GymService){

	var DashboardService = {

		muscleGroups: null,
		exercises: null,
		exerciseLog: null,
		dates: null,
		logHistory: null,
		dailyStatistics: null,

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

		getDailyStatistics: function(){
			var self = this;
			return GymService.oneUrl('muscleGroup/getDailyStatistics').get().then(function(response){
				self.dailyStatistics = response;
				$log.debug('getDailyStatistics', response.plain());
				return self.dailyStatistics;
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

		getLogByDateAndWorkoutId: function(date, workoutId){
			console.log('date',date);
			var self = this;
			return GymService.oneUrl('exerciseLog/getLogByDateAndWorkoutId/workoutId/'+ workoutId + '/date/' + date).get().then(function(response){
				if(date !== null){
					self.logHistory = response;
					$log.debug('getLogHistory', self.logHistory.plain());
					return self.logHistory;
				}else{
					self.exerciseLog = response;
					$log.debug('getLogByDateAndWorkoutId', self.exerciseLog.plain());
					return self.exerciseLog;
				}
			}, function(response){
				$log.debug('error', response);
			});
		},

		updateLog: function(loggedExercise){
			var self = this;
			return GymService.all('exerciseLog/updateLog').post(loggedExercise).then(function(response){
				self.exerciseLog = response;
				$log.debug('updateLog', response.plain());
				return self.exerciseLog;
			}, function(response){
				$log.debug('error', response);
			});
		},

		getLogDates: function(workoutId){
			var self = this;
			return GymService.oneUrl('exerciseLog/getLogDates/' + workoutId).get().then(function(response){
				self.dates = response;
				$log.debug('getLogDates', response.plain());
				return self.dates;
			}, function(response){
				$log.debug('error', response);
			});
		}

	};

	return DashboardService;

}]);
