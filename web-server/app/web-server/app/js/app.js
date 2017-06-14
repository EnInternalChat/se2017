/*
var app = angular.module('myApp',
  ['internalChat.filters', 'internalChat.services', 
  'internalChat.directives', 'internalChat.controllers']);
*/
/*
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .when('/notice', {
    templateUrl: 'templates/notice.html',
    controller: 'noticeCtrl'
  })
  .when('/setting',{
    templateUrl:'templates/setting.html',
    controller:'settingCtrl'
  })

  .when('/user',{
    templateUrl:'templates/user.html',
    controller:'userCtrl'
  })
  .when('/task',{
    templateUrl:'templates/task.html',
    controller:'taskCtrl'
 })

  .otherwise({
    redirectTo: '/login'
  });
}]);

angular.module('internalChat.controllers', ['internalChat.services']);
*/
var app = angular.module('internalChat',
    ['internalChat.filters', 'internalChat.services',
        'internalChat.directives', 'internalChat.controllers']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'templates/user.html',
            controller: 'HomeCtrl'
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

angular.module('internalChat.controllers', ['internalChat.services']);


