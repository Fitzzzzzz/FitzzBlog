var controllers = angular.module('ctrls',[]);
controllers.controller('topBarCtrl',['$scope','$http','RequestUrl','ngDialog',function($scope,$http,RequestUrl,ngDialog){
    $scope.items=[
		{url:"",active:"active",content:"欢迎"},
        {url:".title",active:"",content:"全部文章"},
		{url:"",active:"",content:"挖坑填坑"},
		{url:"",active:"",content:"环境搭建"},
		{url:"",active:"",content:"生活吐槽"}
	];
	$scope.articles=[];
    $scope.change = function($index){
		$scope.items[0].active = "";
		for (var i = 0; i < $scope.items.length; i++) {
			$scope.items[i].active = "";
		}
		$scope.items[$index].active = "active";
		
	}
	$scope.clickToOpen = function(){
		ngDialog.open({
			template:'tpls/logindialog.html',
			className:'ngdialog-theme-default',
			controller:'logInCtrl'
		});
	}
}]);
controllers.controller('logInCtrl',['$scope','$state','PostToTp','ngDialog',function($scope,$state,PostToTp,ngDialog){
	$scope.user={};
	$scope.login=function(){
		PostToTp.getResponse("login",{'username':$scope.user.username,'upassword':$scope.user.password}).success(
			function(data){
				console.log(data);
				switch(data.code){
					case '0000' : window.location.href="http://localhost/admin/admin.html";ngDialog.closeAll();break;
					case '1111' : alert(data.msg);break;
					case '2222' : alert(data.msg);break;
					case '0011' : alert(data.msg);break;
				}
			}
		).error(function(){console.log("login error!")});
	}
}]);
controllers.controller('titleCtrl',['$scope','$http','RequestUrl','Article',function($scope,$http,RequestUrl,Article){
    $scope.articles=[];
	$scope.left_nav_items=[
		{url:"",active:"active",content:"NAV ITEM 1"},
		{url:".article",active:"",content:"NAV ITEM 2"},
		{url:"",active:"",content:"NAV ITEM 3"},
		{url:"",active:"",content:"NAV ITEM 4"},
	];
	$scope.changeLeftNav = function($index){
		for (var i = 0; i < $scope.left_nav_items.length; i++) {
			$scope.left_nav_items[i].active = "";
		}
		$scope.left_nav_items[$index].active = "active";
		if($index === 1){
			$http({
				method:'get',
				url:RequestUrl.url+"getArticle"
			}).success(function(data){
				Article.articles = data;
				console.log(Article.articles);
			}).error(function(){
				console.log("http get error");
			})
		}
	}
}]);
controllers.controller('articleCtrl',['$scope','$rootScope','$state','Article',function($scope,$rootScope,$state,Article){
	$scope.articles = Article.articles;
	$scope.showContent = function($index){
		$rootScope.content = $scope.articles[$index].art_content;
		console.log($scope.articles[$index].art_content);
		$state.go('home.title.content');
	}
}]);
controllers.controller('editorCtrl',['$scope','$rootScope',function($scope,$rootScope){
	$scope.content = $rootScope.content;
}]);