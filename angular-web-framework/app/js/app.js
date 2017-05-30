var app = angular.module('internalChat', 
  ['internalChat.filters', 'internalChat.services', 
   'internalChat.directives', 'internalChat.controllers']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: 'templates/home.html', 
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