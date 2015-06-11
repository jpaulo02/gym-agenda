angular.module('nmtApp.controllers').
controller('DashboardController', ['$scope', '$filter', '$state', '$stateParams', '$rootScope', 'DashboardService', function($scope, $filter, $state, $stateParams, $rootScope, DashboardService){ 
	
	$scope.username = $stateParams.username;
	$scope.muscleGroups = null;
	$scope.exercises = null;

	$scope.getAllMuscleGroups = function(){
		DashboardService.getAllMuscleGroups().then(function(response){
			$scope.muscleGroups = response;
		});
	};


	$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active');
  });
});

	$scope.getAllMuscleGroups();

}]);