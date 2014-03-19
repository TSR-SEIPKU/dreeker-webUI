/**
* dreeker.restAPI Module
*
* Description
*/
angular.module('dreeker.restAPI', ['ngResource']).
factory('restService', ['$resource', function($resource){
	return function(serviceName, params, back){
		var data = $resource(serviceName, params).get(function(){
			// alert(angular.toJson(data, true));
			if(data.result == 'suc') {
				back(data.object);
			} else if (data.result == 'login') {

			} else {

			}
		}, function(){
			alert("网络错误，请稍后再试");
		});
	};
}])