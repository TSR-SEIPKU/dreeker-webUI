/**
* dreeker.restAPI Module
*
* Description
*/
angular.module('dreeker.restAPI', ['ngResource']).
factory('restService', ['$resource', function($resource){
	return function(serviceName, params, back, callbackObj){
		var data = $resource(serviceName, params).get(function(){
			// alert(angular.toJson(data, true));
			if(data.result == 'suc') {
				if (callbackObj == null) {
					back(data.object);
				} else {
					//用apply传递closure
					back.apply(callbackObj, [data.object]);
				}
			} else if (data.result == 'login') {

			} else {

			}
		}, function(){
			alert("网络错误，请稍后再试");
		});
	};
}])