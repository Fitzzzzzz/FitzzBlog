var services = angular.module('services',[]);

services.service('RequestUrl',['$rootScope',function($rootScope){
	var service = {
		url:'http://localhost/api/tp5/public/index.php/index/index/'
	}
	return service;
}]);
services.service('PostToTp',['$rootScope','$http','RequestUrl',function($rootScope,$http,RequestUrl){
	var doRequest = function(path,data){
		return $http({
				method:"post",
				url:RequestUrl.url+path,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data:data
			});
	}
	return {
		getResponse : function(path,data){
			return doRequest(path,data);
		}
	}
}]);