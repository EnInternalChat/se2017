angular.module('internalChat.controllers')

.controller('HomeCtrl', function ($rootScope, $scope, $window) {
    $scope.message = "自定义信息";

    $scope.go_to_login = function() {
        $window.location.href = ('#/login');
    }
})

.controller('LoginCtrl', function($rootScope, $scope, $window) {
    $scope.message = "登录信息";
});