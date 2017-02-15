var services = angular.module('services',[]);

services.service('RequestUrl',['$rootScope',function($rootScope){
	var service = {
		url:'http://localhost/api/tp5/public/index.php/index/index/'
	}
	return service;
}]);