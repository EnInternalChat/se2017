app.controller('MailCtrl', ['$scope', function($scope) {
  $scope.folds = [
    {name: 'Inbox', filter:''},
    {name: 'Accept', filter:'accept'},
    {name: 'Sent', filter:'sent'}
  ];

  $scope.labels = [
    {name: '程序部', filter:'程序部', color:'#23b7e5'},
    {name: '财政部', filter:'财政部', color:'#7266ba'},
    {name: '业务部', filter:'业务部', color:'#fad733'},
    {name: '开发部', filter:'开发部', color:'#27c24c'},
    {name: '客服部', filter:'客服部', color:''}
  ];

  $scope.addLabel = function(){
    $scope.labels.push(
      {
        name: $scope.newLabel.name,
        filter: angular.lowercase($scope.newLabel.name),
        color: '#ccc'
      }
    );
    $scope.newLabel.name = '';
  }

  $scope.labelClass = function(label) {
    return {
      'b-l-info': angular.lowercase(label) === '程序部',
      'b-l-primary': angular.lowercase(label) === '财政部',
      'b-l-warning': angular.lowercase(label) === '业务部',
      'b-l-success': angular.lowercase(label) === '客服部'
    };
  };

}]);

app.controller('MailListCtrl', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  $scope.fold = $stateParams.fold;
  mails.all().then(function(mails){
    $scope.mails = mails;
  });
}]);

app.controller('MailDetailCtrl', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  mails.get($stateParams.mailId).then(function(mail){
    $scope.mail = mail;
  })
}]);

app.controller('MailNewCtrl', ['$scope', function($scope) {
  $scope.mail = {
    to: '',
    subject: '',
    content: ''
  }
  $scope.tolist = [
    {name:'程序部',labels:'程序部'},
    {name: '业务部', labels:'业务部'},
    {name: '客服部', labels:'客服部'}
  ];
}]);

angular.module('app').directive('labelColor', function(){
  return function(scope, $el, attrs){
    $el.css({'color': attrs.color});
  }
});