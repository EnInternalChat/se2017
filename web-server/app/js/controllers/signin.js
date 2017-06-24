'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', 'API', 'MD5', '$state', '$localStorage' 
  function($scope, API, MD5, $state, $localStorage) {
    $scope.user = {};
    $scope.authError = null;

    $scope.login = function() {
      API.loading();
      API.login($scope.user.username, MD5.encrypt($scope.user.password)).then(
        function(res) {
          API.stop_loading();
          if(!res.status)
            $scope.authError = res.info;
          else 
            $state.go('app.dashboard-v1');
        });
    };

    if($localStorage.authenticated) {
      $scope.user.username = $localStorage.username;
      $scope.user.password = $localStorage.password;
      API.loading();
      API.login($localStorage.username, $localStorage.password).then(
        function(res) {
          API.stop_loading();
          if(!res.status)
            $scope.authError = res.info;
          else
            $scope.go('app.dashboard-v1');
        })
    }

  }])
;