/**
* newTraceJob Module
*
* Description
*/


dreeker.newTraceJob = angular.module('dreeker.newTraceJob', []);

dreeker.newTraceJob.SeedCategoryService = function(restService) {
	//this.categories = [123,1,2,3];
	this._restService = restService;
	this.seeds = [];
	//初始化时读取所有的category
	restService('restLoadAllCategories',{}, function(obj){
		this.categories = obj;
	}, this);
};

dreeker.newTraceJob.controller('NewTraceJobController', ['$scope', 'restService', 'SeedCategoryService', function($scope, restService, SeedCategoryService){
	$scope.rules = [{}];
	$scope.job = {rule: 1};

	$scope.job.categories = [];
	$scope.categories = [];
	$scope.job.seeds = [];

	$scope.SCService = SeedCategoryService;
	// $scope.SCService.init();

	// restService('restLoadAllCategories',{}, function(obj){
	// 	$scope.categories = obj;
	// });

	$scope.addRule = function(){
		$scope.rules.push({});
	};

	$scope.deleteRule = function(i){
		$scope.rules.splice(i,1);
	};
	
	$scope.loadCategory = function(catUuid) {
		restService('restGetSeedsByCategory',{categoryUuid: catUuid}, function(obj){
			$scope.job.seeds = obj;
		});
	};

}]).service('SeedCategoryService', ['restService', dreeker.newTraceJob.SeedCategoryService]);

