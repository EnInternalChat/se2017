'use strict';

/* Controllers */

app.controller('DashboardCtrl', ['$scope', 'mails', function($scope, mails) {
  mails.get_mails('').then(function(mails) {
    $scope.mails = mails;
    $scope.$apply();
  })    
}]);