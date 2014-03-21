var userModule = angular.module('dreeker.userModule', [
	'ngResource', 
	'ngCookies',
]);

userModule.factory('userService', ['$cookieStore', '$resource', function($cookieStore, $resource) {
	return {
		isLoggedin: function(){
			if ($cookieStore.get('currentUser')) {
				return true;
			}
			return false;
		},

		currentUser: function(){
			return $cookieStore.get('currentUser')
		},

		login: function(email, password, success, fail){
			var data = $resource('restLogin', {loginEmail: email, loginPassword: password}).get(function(){
				// alert(angular.toJson(data, true));
				if(data.result == 'suc') {
					$cookieStore.put('currentUser', data.object);
					success();
				} else {
					fail();
				}
			}, function(){
				alert("网络错误，请稍后再试");
			});
		},

		logout: function(){
			$cookieStore.remove('currentUser');
		},
	};
}]);

userModule.controller('LoginController', ['$scope', 'userService', '$location', function($scope, user, $location){
	// alert(user.isLoggedin);
	$scope.errorInfo = "";

	$scope.isLoggedin = function() {
		// alert(user.isLoggedin);
		return user.isLoggedin();
	};

	$scope.currentUser = function(){
		// alert(angular.toJson(user.currentUser()));
		return user.currentUser();
	};

	$scope.login = function(loginEmail, loginPw) {

		// $location.path('/myTracejobdfsdfsdfsdfsdfs');
		if (isInvalid(loginEmail, loginPw)) {
			$scope.errorInfo = '输入信息有误';
		} else {
			$scope.errorInfo = "";
			user.login(loginEmail, loginPw, loginSuc, loginFail);
		}
	};

	$scope.clearErroInfo = function(){
		$scope.errorInfo = "";
	};

	$scope.logout = function(){
		user.logout();
	};

	function loginSuc() {
		$scope.errorInfo = '';
		$('#loginModal').modal('hide');
		$scope.loginEmail = '';
		$scope.loginPw = '';
		$location.path('/myTraceJob');
	}

	function loginFail() {
		$scope.errorInfo = '邮箱或密码错误';
	}

	function isInvalid(loginEmail, loginPw) {
		if (loginPw == undefined || loginEmail == undefined) {
			return true;
		}
		return false;
	};
}]);

userModule.run(['$rootScope', '$location', 'userService', function($root, $location, user){
	$root.$on("$routeChangeStart", function(event, next, current){
		// if (current != undefined) {
		// 	alert(current.templateUrl);
		// }
		// alert(next.templateUrl);
		if (!next.access) {return};
		if (!user.isLoggedin() && !next.access.guest) {
			alert("not logged!");
			$location.path('/home');
		};
	});
}]);
