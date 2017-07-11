'use strict';

/* Controllers */

app.controller('DashboardCtrl', ['$scope', 'mails', '$state', 
    function($scope, mails, $state) {
  mails.get_mails('').then(function(mails) {
    $scope.mails = mails;
    $scope.$apply();
  });
  $scope.mail_detail = function(id) {
    $state.go('app.mail.detail', { mailID: parseInt(id) });
  }    
}]);