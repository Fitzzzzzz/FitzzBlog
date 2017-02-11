var controllers = angular.module('ctrls',[]);
controllers.controller('topBarCtrl',['$scope',function($scope){
    $scope.items=[
		{url:"",active:"active",content:"欢迎"},
        {url:".title",active:"",content:"全部文章"},
		{url:"",active:"",content:"挖坑填坑"},
		{url:"",active:"",content:"环境搭建"},
		{url:"",active:"",content:"生活吐槽"}
	];
    $scope.change = function($index){
		$scope.items[0].active = "";
		for (var i = 0; i < $scope.items.length; i++) {
			$scope.items[i].active = "";
		}
		$scope.items[$index].active = "active";
	}
}]);
controllers.controller('titleCtrl',['$scope',function($scope){
    $scope.items={};
		
	$scope.left_nav_items=[
		{url:"",active:"active",content:"NAV ITEM 1"},
		{url:"",active:"",content:"NAV ITEM 2"},
		{url:"",active:"",content:"NAV ITEM 3"},
		{url:"",active:"",content:"NAV ITEM 4"},
	];
	$scope.changeLeftNav = function($index){
		for (var i = 0; i < $scope.left_nav_items.length; i++) {
			$scope.left_nav_items[i].active = "";
		}
		$scope.left_nav_items[$index].active = "active";
		// if ($index === 2) {
		// 	$http({
		// 		method:"get",
		// 		url:RequestUrl.url+"items"
		// 	}).success(function(data){
		// 		console.log(data);
		// 		$scope.items = data;
		// 	}).error(function(){alert("items request error");});
		// }
	}
}]);