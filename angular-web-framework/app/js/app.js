var app = angular.module('myApp',
  ['internalChat.filters', 'internalChat.services', 
  'internalChat.directives', 'internalChat.controllers']);

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
  .when('/test', {
    templateUrl: 'templates/test.html',
    controller: 'testCtrl'
  }) 
  .otherwise({
    redirectTo: '/login'
  });
}]);

angular.module('internalChat.controllers', ['internalChat.services']);