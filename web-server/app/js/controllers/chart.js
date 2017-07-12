'use strict';

/* Controllers */

app.controller('DashboardCtrl', ['$scope', 'mails', 'tasks', '$state', 
    function($scope, mails, tasks, $state) {
  mails.get_mails('').then(function(mails) {
    $scope.mails = mails;
    $scope.$apply();
  });
  tasks.get_all().then(function(tasks) {
    $scope.tasks = tasks;
    $scope.$apply();
  })
  $scope.mail_detail = function(id) {
    $state.go('app.mail.detail', { mailID: parseInt(id) });
  }    
}]);