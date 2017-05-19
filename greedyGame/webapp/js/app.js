var app = angular.module("music", ['ui.router', 'ngResource']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider){

	$stateProvider
	.state('/', {
		url: "/home",
		views: {
			'': {
				templateUrl: "home.html",
				controller: "homeCtrl",
			}
		}
	})
	
	$urlRouterProvider.otherwise("/home");
	
}); 

app.filter('capitalize', function() {
    return function(input) {
			return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
});

app.factory('Resource', function($resource) {
  return $resource('http://104.197.128.152:8000/v1/tracks');
});