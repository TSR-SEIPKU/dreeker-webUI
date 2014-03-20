var tracejobControl = angular.module('dreeker.traceJobController', [
		'dreeker.config', 
		'dreeker.restAPI',
		'ngResource', 
		'ngCookies',
		'ngSanitize',
	]);

tracejobControl.controller('MyTraceJobController', ['$scope', 'userService', '$location', '$resource', 'restService', function($scope, user, $location, $resource, restService){

	$scope.traceJobs = [];
	$scope.matchedEntities = [];
	$scope.currentEntity = {};

	function setActive(array, i){
		array.forEach(function(entry) {
    		entry.active = false;
		});
		array[i].active = true;
	};


	restService('restMyTraceJobs',{start: 0, limit: 100}, function(obj){
		$scope.traceJobs = obj;
		$scope.loadWebentities(0);
	});

	$scope.loadWebentities = function(index) {
		setActive($scope.traceJobs, index);
		var uuid = $scope.traceJobs[index].traceJob.uuid;
		restService('restLoadWebEntities', {traceJobUuid: uuid, start: 0, limit: 25}, function(obj){
			$scope.matchedEntities = obj[0];
		});
	};

	$scope.showEntity = function(index){
		$scope.currentEntity = $scope.matchedEntities[index].webEntity;
	}

}]);