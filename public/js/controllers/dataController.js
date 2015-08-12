angular.module('nmtApp.controllers').
controller('DataController', ['DashboardService' ,'$scope', '$filter', '$state', '$stateParams', '$rootScope', '$timeout', '$interval', function(DashboardService, $scope, $filter, $state, $stateParams, $rootScope, $timeout, $interval){ 


	$scope.exerciseId = $stateParams.id;
	$scope.exerciseName = $stateParams.name;
	$scope.exerciseData = null;
	$scope.weightSeriesData = [];
	$scope.dateSeriesData = [];
	$scope.repsSeriesData = [];

	$scope.getGraphDataByExerciseId = function(){
		DashboardService.getGraphDataByExerciseId($scope.exerciseId).then(function(response){
			console.log('response',response);
			$scope.exerciseData = response;
			$scope.pushDataToArray();
		});
	};

	$scope.showGraph = function(){
		console.log('$scope.workoutId',$scope.workoutId);
	};


	$scope.pushDataToArray = function(){
		console.log('exerciseData',$scope.exerciseData);
		for (var i = 0; i < $scope.exerciseData.logs.length; i++) {
			console.log('$scope.exerciseData.logs ',i," ", $scope.exerciseData.logs[i]);
			$scope.weightSeriesData.push(parseInt($scope.exerciseData.logs[i].weight));
			$scope.repsSeriesData.push(parseInt($scope.exerciseData.logs[i].reps));
			$scope.dateSeriesData.push($scope.exerciseData.logs[i].date);
		}
		console.log('$scope.weightSeriesData',$scope.weightSeriesData);
		console.log('$scope.repsSeriesData',$scope.repsSeriesData);
		console.log('$scope.dateSeriesData',$scope.dateSeriesData);
		initiChart();
	};


	$scope.getGraphDataByExerciseId($scope.exerciseId);



	var initiChart = function(){
		$('#container').highcharts({
			title: {
				text: $scope.exerciseName,
				x: -20 //center
			},
			subtitle: {
				text: null,
				x: -20
			},
			xAxis: {
				categories: $scope.dateSeriesData
			},
			yAxis: {
				title: {
					text: 'Total Amount'
				},
				min: 0,
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				valueSuffix: ' lbs'
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: 'Weight',
				data: $scope.weightSeriesData
			}, {
				name: 'Reps',
				data: $scope.repsSeriesData
			}]
		});
	};

}]);