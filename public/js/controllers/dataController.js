angular.module('nmtApp.controllers').
controller('DataController', ['DashboardService' ,'$scope', '$filter', '$state', '$stateParams', '$rootScope', '$timeout', '$interval', function(DashboardService, $scope, $filter, $state, $stateParams, $rootScope, $timeout, $interval){ 


	$scope.exerciseId = $stateParams.id;
	$scope.exerciseName = $stateParams.name;
	$scope.exerciseData = null;
	$scope.weightSeriesData = [];
	$scope.dateSeriesData = [];
	$scope.repsSeriesData = [];
	$scope.avgWeightSeriesData = [];

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
			$scope.weightSeriesData.push(parseInt($scope.exerciseData.logs[i].weight));
			$scope.repsSeriesData.push(parseInt($scope.exerciseData.logs[i].reps));
			$scope.dateSeriesData.push($scope.exerciseData.logs[i].date);
			$scope.avgWeightSeriesData.push($scope.exerciseData.logs[i].weight/$scope.exerciseData.logs[i].reps);
		}
		console.log('$scope.weightSeriesData',$scope.weightSeriesData);
		console.log('$scope.repsSeriesData',$scope.repsSeriesData);
		console.log('$scope.dateSeriesData',$scope.dateSeriesData);
		console.log('$scope.avgWeightSeriesData',$scope.avgWeightSeriesData);

		initiChart();
	};


	$scope.getGraphDataByExerciseId($scope.exerciseId);



	var initiChart = function(){
		$('#container').highcharts({
		   colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
			  "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
			chart: {
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
					stops: [
						[0, '#2a2a2b'],
						[1, '#3e3e40']
					]
			},
			style: {
				fontFamily: "'Unica One', sans-serif"
			},
				plotBorderColor: '#606063'
			},
			title: {
				color: '#E0E0E3',
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
			}, 
			{
				name: 'Reps',
				data: $scope.repsSeriesData
			},
			{
				name: 'Avg Weight',
				data: $scope.avgWeightSeriesData
			}]
		});
	};

}]);