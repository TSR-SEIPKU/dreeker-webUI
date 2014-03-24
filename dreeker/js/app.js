var dreeker = angular.module('dreeker', [
	'ngResource',
	'ngRoute',
	'dreeker.userModule',
	'dreeker.traceJobController',
	'dreeker.newTraceJob',
	'ui.utils'
]);

/*
添加login后验证用户的header以及为rest服务加上域名
*/
dreeker.factory('httpRequestInterceptor', ['$cookieStore', function($cookieStore) {
  return {
    request: function (config) {
      config.headers = {'dreekerauth': $cookieStore.get('currentUser')?$cookieStore.get('currentUser').uuid:"null"}
      if(config.url.indexOf('rest') >= 0) {
      	config.url = "http://localhost:8080/Dreeker/rest/" + config.url;
      }
      return config;
    }
  };
}]);

dreeker.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
})

dreeker.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'partials/home.html', 
		access: {
			guest: true,
			user: true
		}
	});
	$routeProvider.when('/myTraceJob', {
		templateUrl: 'partials/myTraceJob.html',
		access: {
			guest: false,
			user: true
		}
	});
	$routeProvider.when('/newTraceJob', {
		templateUrl: 'partials/newTraceJob.html',
		access: {
			guest: false,
			user: true
		}
	});
	$routeProvider.when('/popularTraceJob', {
		templateUrl: 'partials/popularTraceJob.html',
		access: {
			guest: false,
			user: true
		}
	});
	$routeProvider.otherwise({
		redirectTo: '/home'
		// templateUrl: 'partials/home.html',
		// access: {
		// 	guest: true,
		// 	ser: true
		// }
	});
}]);