/**
* newTraceJob Module
*
* Description
*/


dreeker.newTraceJob = angular.module('dreeker.newTraceJob', []);

dreeker.newTraceJob.SeedCategoryService = function(restService) {
	this._restService = restService;
	this.seeds = {};
	//初始化时读取所有的category
	restService('restLoadAllCategories',{}, function(obj){
		this.categories = obj;
	}, this);
};

dreeker.newTraceJob.SeedCategoryService.prototype.addCat = function(catUuid) {
	for (var i = 0; i < this.categories.length; i++) {
		var item = this.categories[i]
		if (catUuid == item.uuid) {
			item.selected = true;
		};
	};
	this._restService('restGetSeedsByCategory',{categoryUuid: catUuid}, function(obj){
		for (var i = 0; i < obj.length; i++) {
			var seedUuid = obj[i].uuid;
			var seed = this.seeds[seedUuid]
			if (!seed) {
				obj[i].belongedCats = [catUuid];
				this.seeds[seedUuid] = obj[i];
			} else {
				this.seeds[seedUuid].belongedCats.push(catUuid);
			}
		};
	}, this);
};

dreeker.newTraceJob.SeedCategoryService.prototype.removeCat = function(catUuid) {
	for (var i = 0; i < this.categories.length; i++) {
		var item = this.categories[i]
		if (catUuid == item.uuid) {
			item.selected = false;
		};
	};
	var seeds = this.seeds;
	for (var seedUuid in seeds) {
		var cats = seeds[seedUuid].belongedCats;
		var i = cats.indexOf(catUuid);
		if (i > -1) {
			cats.splice(i,1);
			if (cats.length == 0) {
				delete seeds[seedUuid];
			};
		};
	};
};

dreeker.newTraceJob.controller('NewTraceJobController', ['$scope', 'restService', 'SeedCategoryService', function($scope, restService, SeedCategoryService){
	$scope.rules = [{}];
	$scope.job = {rule: 1};

	$scope.job.categories = [];
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

	$scope.addCategory = function(uuid) {
		$scope.SCService.addCat(uuid);
	}

	$scope.removeCategory = function(uuid) {
		$scope.SCService.removeCat(uuid);
	}

	$scope.loadCategory = function(catUuid) {
		
	};

}]).service('SeedCategoryService', ['restService', dreeker.newTraceJob.SeedCategoryService]);

