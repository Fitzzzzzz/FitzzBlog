var app = angular.module('FitzzBlog',['ui.router','ngAnimate','ctrls','services','ngDialog','hc.marked']);
app.config(function($stateProvider,$urlRouterProvider,markedProvider){
    $urlRouterProvider.otherwise('home');
    $stateProvider
        .state('home',{
            url:'/home',
            views:{
                '':{
                    templateUrl:'tpls/main.html'
                },
                'topbar@home':{
                    templateUrl:'tpls/topbar.html',
                    controller:'topBarCtrl'
                },
                'content@home':{
                    templateUrl:'tpls/hello.html'
                }
            }
        })
        .state('home.title',{
            url:'/title',
            views:{
                'content@home':{
                    templateUrl:'tpls/leftnav.html',
                    controller:'titleCtrl'
                }
            }
        })
        .state('admin',{
            url:'/admin',
            templateUrl:'tpls/editor.html'
        })
        .state('home.title.article',{
            url:'/article',
            templateUrl:'tpls/article.html',
            controller:'articleCtrl'
        })
        .state('home.title.content',{
            url:'/content',
            templateUrl:'tpls/editor.html',
            controller:'editorCtrl'
        });
        markedProvider.setOptions({
            gfm: true,
            tables: true,
            highlight: function (code, lang) {
            if (lang) {
                return hljs.highlight(lang, code, true).value;
            } else {
                return hljs.highlightAuto(code).value;
            }
            }
        });
});