angular.module('nmtApp.controllers').
controller('DashboardController', ['$scope', '$filter', '$state', '$stateParams', '$rootScope', 'DashboardService', '$location', '$cookieStore', function($scope, $filter, $state, $stateParams, $rootScope, DashboardService, $location, $cookieStore){ 
	
	$scope.username = $stateParams.username;
	$scope.muscleGroups = null;
	$scope.exercises = null;
	$scope.user = null;
	$scope.openSearch = true;
	$scope.numWeeks = 1;
	$scope.daysWorkedOut = 0;
	$scope.pieData = {
		daysLifted: null,
		totalDays: null
	};
	$scope.showSideBar = false;
	$scope.routineOrder = null;

	//growlService.growl('Welcome back Jeff!', 'inverse');

	//$rootScope.loggedIn = false;
	//$cookieStore.put('user',$rootScope.loggedIn);

	console.log('$rootScope.user',$rootScope.user);

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		console.log('ismobile');
		angular.element('html').addClass('ismobile');
	}

/*
	$scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){ 
		if (($rootScope.user.validated === null || $rootScope.user.validated === false) && newValue != '/login'){  
			console.log('entered if');
			$location.path('/login'); 
		}
	});
*/

	$scope.showSideBar = function(){
		console.log('show side bar');
		$scope.showSideBar = !$scope.showSideBar;
	};

	$scope.getAllMuscleGroups = function(){
		DashboardService.getAllMuscleGroups().then(function(response){
			$scope.muscleGroups = response;
		});
	};

	$scope.userLogin = function(){
		DashboardService.userLogin().then(function(response){
			$scope.user = response;
		});
	};

	$scope.getNumDaysWorkedOutByWeeks = function(numWeeks){
		if(numWeeks === undefined){
			numWeeks = $scope.numWeeks;
		}
		DashboardService.getNumDaysWorkedOutByWeeks(numWeeks).then(function(response){
			$scope.pieData.daysLifted = response;
			$scope.pieData.totalDays = numWeeks*7;
			console.log('$scope.pieData.daysLifted',$scope.pieData.daysLifted);
			console.log('$scope.pieData.totalDays',$scope.pieData.totalDays);
			test();
		});
	};

	$scope.goToRoutine = function(){
		console.log('bing bong');
	};

	$scope.getRoutineOrder = function(){
		var userId = 1;
		DashboardService.getRoutineOrder(userId).then(function(response){
			console.log('response biiiiiiing',response);
			$scope.routineOrder = response;
			console.log('$scope.routineOrder',$scope.routineOrder);
		});
	};

	$(document).ready(function () {
		$('[data-toggle="offcanvas"]').click(function () {
			$('.row-offcanvas').toggleClass('active');
		});
	});


	var test = function () {
		$('#container2').highcharts({
			credits: {
				enabled: false
			},
			chart: {
				backgroundColor: "black",
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'How you spent the last week',
				style: { "color": "#fff"}
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: 'font-size: 11px; color: #f5f5f5;fill: #f5f5f5; text-shadow: none;'
						}
					}
				}
			},
			series: [{
				name: "Days",
				colorByPoint: true,
				data: [{
					name: "Worked Out",
					y: $scope.pieData.daysLifted,
					sliced: true,
					selected: true
				}, {
					name: "Didn't Workout",
					y: $scope.pieData.totalDays - $scope.pieData.daysLifted
				}]
			}]
		});
	};


	$scope.getRoutineOrder();
	$scope.getNumDaysWorkedOutByWeeks();
	$scope.getAllMuscleGroups();

	//http://localhost:5000/#/exercise/Biceps
	//http://localhost:5000/#/exercise/31/Barbell%20Curl/log

}])



.directive('dashCalendar', function() {
  return {
	template: 'Name: {{customer.name}} Address: {{customer.address}}'
  };
})



.directive('calendar', function($compile){
	return {
		restrict: 'A',
		scope: {
			select: '&',
			actionLinks: '=',
		},
		link: function(scope, element, attrs) {
			
			var date = new Date();
			var d = date.getDate();
			var m = date.getMonth();
			var y = date.getFullYear();

			//Generate the Calendar
			element.fullCalendar({
				header: {
					right: '',
					center: 'prev, title, next',
					left: ''
				},

				theme: true, //Do not remove this as it ruin the design
				selectable: true,
				selectHelper: true,
				editable: true,

				//Add Events
				events: [
					{
						title: 'Hangout with friends',
						start: new Date(y, m, 1),
						allDay: true,
						className: 'bgm-cyan'
					},
					{
						title: 'Meeting with client',
						start: new Date(y, m, 10),
						allDay: true,
						className: 'bgm-red'
					},
					{
						title: 'Repeat Event',
						start: new Date(y, m, 18),
						allDay: true,
						className: 'bgm-blue'
					},
					{
						title: 'Semester Exam',
						start: new Date(y, m, 20),
						allDay: true,
						className: 'bgm-green'
					},
					{
						title: 'Soccor match',
						start: new Date(y, m, 5),
						allDay: true,
						className: 'bgm-purple'
					},
					{
						title: 'Coffee time',
						start: new Date(y, m, 21),
						allDay: true,
						className: 'bgm-orange'
					},
					{
						title: 'Job Interview',
						start: new Date(y, m, 5),
						allDay: true,
						className: 'bgm-dark'
					},
					{
						title: 'IT Meeting',
						start: new Date(y, m, 5),
						allDay: true,
						className: 'bgm-cyan'
					},
					{
						title: 'Brunch at Beach',
						start: new Date(y, m, 1),
						allDay: true,
						className: 'bgm-purple'
					},
					{
						title: 'Live TV Show',
						start: new Date(y, m, 15),
						allDay: true,
						className: 'bgm-orange'
					},
					{
						title: 'Software Conference',
						start: new Date(y, m, 25),
						allDay: true,
						className: 'bgm-blue'
					},
					{
						title: 'Coffee time',
						start: new Date(y, m, 30),
						allDay: true,
						className: 'bgm-orange'
					},
					{
						title: 'Job Interview',
						start: new Date(y, m, 30),
						allDay: true,
						className: 'bgm-dark'
					},
				],

				//On Day Select
				select: function(start, end, allDay) {
					scope.select({
						start: start, 
						end: end
					});
				}
			});
			//Add action links in calendar header
			element.find('.fc-toolbar').append($compile(scope.actionLinks)(scope));
		}
	};
})
	
//Change Calendar Views
.directive('calendarView', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.on('click', function(){
				$('#calendar').fullCalendar('changeView', attrs.calendarView);  
			});
		}
	};
});
/*
		<mwl-calendar
			view="calendarView"
			current-day="calendarDay"
			events="events"
			view-title="calendarTitle"
			on-event-click="eventClicked(calendarEvent)"
			on-event-times-changed="calendarEvent.startsAt = calendarNewEventStart; calendarEvent.endsAt = calendarNewEventEnd"
			edit-event-html="'<i class=\'glyphicon glyphicon-pencil\'></i>'"
			delete-event-html="'<i class=\'glyphicon glyphicon-remove\'></i>'"
			on-edit-event-click="eventEdited(calendarEvent)"
			on-delete-event-click="eventDeleted(calendarEvent)"
			cell-is-open="true">
		</mwl-calendar>
	};
*/