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
controllers.controller('titleCtrl',['$scope','$http','$filter','RequestUrl','Article',function($scope,$http,$filter,RequestUrl,Article){
    $scope.articles=[];
	$scope.left_nav_items=[{url:".article",active:"active",contents:"2016-12"},
							{url:".article",active:"",contents:"2017-1"}
							];
	$scope.articles_time=new Array();
	$http({
				method:'get',
				url:RequestUrl.url+"getArticleTime"
			}).success(function(data){
				// for(var i = 0;i < data.length;i++){
				// 	var time  = $filter("date")(data[i].create_time*1000,"yyyy-MM-dd");
				// 	$scope.articles_time.push(time);
				// }
				// console.log("articles_time = "+$scope.articles_time);
				// var tem = {url:".article",active:"active",contents:""}
				// tem.contents = $scope.articles_time[0];
				// $scope.left_nav_items.push(tem);
				// console.log("first push ==== " + $scope.left_nav_items);
				// for(var i = 1;i < $scope.articles_time.length;i++){
				// 	var tem2 = {url:".article",active:"",contents:""};
				// 	if($scope.left_nav_items[i-1].contents !== $scope.articles_time[i]){
				// 		tem2.contents = $scope.create_time[i];
				// 		$scope.left_nav_items.push(tem2);
				// 	}
				// }
				// console.log("left---" + $scope.left_nav_items);
			}).error(function(){
				console.log("http get error");
			});
	
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
		$rootScope.contents = $scope.articles[$index].art_content;
		console.log($scope.articles[$index].art_content);
		$state.go('home.title.content');
	}
}]);
controllers.controller('editorCtrl',['$scope','$rootScope',function($scope,$rootScope){
	$scope.contents = $rootScope.contents;
}]);