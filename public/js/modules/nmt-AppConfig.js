angular.module('nmtApp')
.constant('nmtAppConfig',{
	environment: {
		dev: {
			//host: 'http://198.199.113.235:8080/gym-agenda'
			host: 'http://localhost:8080/gym-agenda'
		},
		prod: {
			host: 'http://198.199.113.235:8080/gym-agenda'
		}
	}
})

.factory('SpotifyService',['Restangular', 'nmtAppConfig', function(Restangular, nmtAppConfig){
	return Restangular.withConfig(function(RestangularConfigurer){
		var baseUrl = nmtAppConfig.environment.dev.host;
		RestangularConfigurer.setBaseUrl(baseUrl);
	});
}])
.factory('GymService',['Restangular', 'nmtAppConfig', function(Restangular, nmtAppConfig){
	return Restangular.withConfig(function(RestangularConfigurer){
		var baseUrl = nmtAppConfig.environment.dev.host;
		RestangularConfigurer.setBaseUrl(baseUrl);
	});
}]);