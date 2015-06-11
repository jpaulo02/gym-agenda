angular.module('nmtApp')
.constant('nmtAppConfig',{
	environment: {
		dev: {
			host: 'http://localhost:8090/gym-agenda'
		},
		prod: {
			host: 'http://104.236.186.185:8090/gym-agenda'
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