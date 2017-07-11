app.controller('MailCtrl', ['$scope', function($scope) {
  $scope.folds = [
    {name: '所有', filter: ''},
    {name: '已读', filter: 'read'},
    {name: '未读', filter: 'unread'},
    {name: '发送', filter: 'send'}
  ];

  $scope.labels = [
    {name: '程序部', filter:'read', color:'#23b7e5'},
    {name: '财政部', filter:'unread', color:'#7266ba'},
    {name: '业务部', filter:'send', color:'#fad733'}
  ];

}]);

app.controller('MailListCtrl', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  $scope.fold = $stateParams.fold;

  $scope.get_mails = function() {
    mails.get_mails($scope.fold).then(function(mails) {
      $scope.mails = mails;
      $scope.$apply();
    });
  }

  $scope.refresh = function() {
    $scope.get_mails();
  }
  $scope.get_mails();
}]);

app.controller('MailDetailCtrl', ['$scope', 'mails', '$stateParams', 
  function($scope, mails, $stateParams) {
    $scope.mail = mails.get_detail($stateParams.mailID);
}]);

app.controller('MailNewCtrl', ['$scope', 'API',
  function($scope, API) {
  $scope.title = "";
  $scope.to_list = { data:[] };
  $scope.sections_list = [];

  $scope.markdown_editor = new SimpleMDE({ 
    element: document.getElementById('markdown-editor'),
    toolbar: [
      "bold", "italic", "strikethrough", "|", 
      "heading-1", "heading-2", "heading-3", "|", 
      "code", "quote", "unordered-list", "ordered-list", "image", "table", "|",
      "preview"] });

  $scope.tree2list = function(tree) {
    $scope.sections_list.push({
      name: tree.name,
      id: tree.ID
    })
    if(tree['childrenSections'].length === 0)
      return;
    else {
      for(var i = 0, n = tree['childrenSections'].length; i < n; i++) {
        $scope.tree2list(tree['childrenSections'][i]);
      }
    }
  }
  
  $scope.get_receive_sections = function() {
    API.loading();
    API.get_company_info().then(
      function(res) {
        $scope.tree2list(res.organization);
        API.stop_loading();
      })
  };

  $scope.send_notice = function() {
    if($scope.to_list.data.length === 0){
      API.alert('接收部门不能为空', $scope, function(){});
      return;
    }
    else if(!$scope.title || $scope.title === "") {
      API.alert('通知标题不能为空', $scope, function(){});
      return;
    }
    var receivers = [];
    $scope.to_list.data.forEach(function(item) {
      receivers.push(item.id);
    });
    API.send_notice(receivers, $scope.title, $scope.markdown_editor.value()).then(
      function(res) {
        console.log("res: ", res);
      })
  }

  $scope.get_receive_sections();
}]);

angular.module('app').directive('labelColor', function(){
  return function(scope, $el, attrs){
    $el.css({'color': attrs.color});
  }
});