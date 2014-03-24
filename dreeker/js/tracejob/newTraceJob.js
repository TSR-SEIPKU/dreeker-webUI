/**
* newTraceJob Module
*
* Description
*/
angular.module('dreeker.newTraceJob', []).
controller('NewTraceJobController', ['$scope', function($scope){
	$scope.rules = [{}];

	$scope.addRule = function(){
		$scope.rules.push({});
	};

	$scope.deleteRule = function(i){
		$scope.rules.splice(i,1);
	};
	
}])