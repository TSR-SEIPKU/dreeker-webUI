var tracejobControl = angular.module('dreeker.traceJobController', ['dreeker.config', 'ngResource', 'ngCookies']);

tracejobControl.controller('MyTraceJobController', ['$scope', 'userService', '$location', '$resource', function($scope, user, $location, $resource){

	$scope.traceJobs = [];
	$scope.matchedEntities = [];
	$scope.currentEntity = {};

	function setActive(array, i){
		array.forEach(function(entry) {
    		entry.active = false;
		});
		array[i].active = true;
	};

	var data = $resource('restMyTraceJobs',{start: 0, limit: 100}).get(function(){
		// alert(angular.toJson(data, true));
		if(data.result == 'suc') {
			$scope.traceJobs = data.object;
			// alert(angular.toJson($scope.traceJobs, true));
			$scope.loadWebentities(0)
		} else if (data.result == 'login') {

		} else {

		}
	}, function(){
		alert("网络错误，请稍后再试");
	});

	$scope.loadWebentities = function(index) {
		setActive($scope.traceJobs, index);
		var uuid = $scope.traceJobs[index].traceJob.uuid

		var data = $resource('restLoadWebEntities',{traceJobUuid: uuid, start: 0, limit: 25}).get(function(){
			// alert(angular.toJson(data, true));
			if(data.result == 'suc') {
				$scope.matchedEntities = data.object[0];
				// alert(angular.toJson($scope.matchedEntities, true));
			} else if (data.result == 'login') {

			} else {

			}
		}, function(){
			alert("网络错误，请稍后再试");
		});
	};

	$scope.showEntity = function(index){
		$scope.currentEntity = $scope.matchedEntities[index].webEntity;
	}

}]);