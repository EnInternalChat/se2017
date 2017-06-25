app.controller('MailCtrl', ['$scope', function($scope) {
  $scope.folds = [
    {name: '所有', filter:''},
    {name: '接收', filter:'接收'},
    {name: '发送', filter:'发送'}
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
      API.alert('接收部门不能为空', $scope);
      // alert('接收部门不能为空');
      return;
    }
    else if(!$scope.title || $scope.title === "") {
      alert('通知标题不能为空');
      return;
    }
    var receivers = [];
    $scope.to_list.data.forEach(function(item) {
      receivers.push(item.id);
    });
    console.log(receivers);
    console.log($scope.title);
    console.log($scope.markdown_editor.value());
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