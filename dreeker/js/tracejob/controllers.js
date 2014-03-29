dreeker.traceJobController = angular.module('dreeker.traceJobController', []);

dreeker.traceJobController.controller('MyTraceJobController', ['$scope', '$location', 'restService', function($scope, $location,  restService){

	$scope.traceJobs = [];
	$scope.matchedEntities = [];
	$scope.currentEntity = {};

	var itemPerPage = 25;
	var loading = false;
	var nextIndex = 0;
	var hasMore = true;
	var currentJobIndex = 0;
	var currentJobUuid = '';
	var pageReady = false;

	restService('restMyTraceJobs',{start: 0, limit: 100}, function(obj){
		$scope.traceJobs = obj;
		$scope.changeCurrentJob(0);
		pageReady = true;
	});

	function setActive(array, i){
		array.forEach(function(entry) {
    		entry.active = false;
		});
		array[i].active = true;
	};

	$scope.unloadable = function(){
		return (loading || !hasMore || !pageReady);
	};

	$scope.loadMore = function(){
		if ($scope.unloadable()) {
			return;
		}
		loading = true;
		restService('restLoadWebEntities', {traceJobUuid: currentJobUuid, start: nextIndex, limit: itemPerPage}, function(obj){
			obj[0].forEach(function(entry) {
				$scope.matchedEntities.push(entry);
			});
			nextIndex += itemPerPage;
			hasMore = obj[1];
			loading = false;
		});
	};

	$scope.changeCurrentJob = function(jobIndex) {
		setActive($scope.traceJobs, jobIndex);
		nextIndex = 0;
		hasMore = true;
		currentJobIndex = jobIndex;
		currentJobUuid = $scope.traceJobs[jobIndex].traceJob.uuid;
		$scope.matchedEntities = [];
		$scope.loadMore();
	};

	$scope.showEntity = function(index){
		$scope.currentEntity = $scope.matchedEntities[index].webEntity;
	}

}]);