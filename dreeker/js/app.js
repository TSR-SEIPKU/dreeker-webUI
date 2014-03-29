dreeker.app = angular.module('dreeker.app', [
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ngSanitize',

	'ui.utils',
	'infinite-scroll',

	dreeker.restAPI.name,
	dreeker.userModule.name,
	dreeker.traceJobController.name,
	dreeker.newTraceJob.name,
]);


/*
添加login后验证用户的header以及为rest服务加上域名
*/
dreeker.app.factory('httpRequestInterceptor', ['$cookieStore', function($cookieStore) {
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

dreeker.app.controller('AppController', ['$location', '$scope', function($location, $scope){
	$scope.atPath = function (path) {
		// alert($location.path() + " " + path);
		return $location.path() == path;
	}
}])

dreeker.app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
})

dreeker.app.config(['$routeProvider', function($routeProvider) {
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

//icheck adaptive
dreeker.app.directive('icheck', function($timeout, $parse) {
    return {
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-red',
	  				radioClass: 'iradio_square-red',

                }).on('ifChanged', function(event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function() {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
});