/**
* newTraceJob Module
*
* Description
*/
angular.module('dreeker.newTraceJob', []).
controller('NewTraceJobController', ['$scope', function($scope){
	$scope.rules = [{}];
	$scope.job = {};
	$scope.job.cat = [];

	for (var i = 0; i < 30; i++) {
		$scope.job.cat.push(true);
	};

	$scope.addRule = function(){
		$scope.rules.push({});
	};

	$scope.deleteRule = function(i){
		$scope.rules.splice(i,1);
	};
	
}]);
