app.controller('ContactCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  // $http.get('js/app/contact/contacts.json').then(function (resp) {
  //   $scope.items = resp.data.items;
  //   $scope.item = $filter('orderBy')($scope.items, 'first')[0];
  //   $scope.item.selected = true;
  // });

  $scope.filter = '';
  $scope.groups = [];
  $scope.group_hash = new Array();
  $scope.items = [];


  $http.get('https://ice.garenfeather.cn/EnInternalChat/company/0').then(function(res) {
    var root_section = res.data.organization;
    $scope.group_hash[root_section['ID']] = root_section['name'];
    $scope.groups.push({
      name: root_section['name'],
      id: root_section['ID']
    });
    $scope.findGroupInTree(root_section['childrenSections']);
  });

  $http.get('https://ice.garenfeather.cn/EnInternalChat/employees/0').then(function(res) {
    res.data.forEach((item) => {
      $scope.items.push({
        group_id: item['sectionID'],
        group_name: "",
        name: item['name'],
        avatar: "img/" + (item['avatar'] + 1) + ".png",
        phone: item['phone'][0],
        email: item['email'][0],
        leader: item['leader'],
        status: item['status']
      })
    })
  })


  $scope.findGroupInTree = function(children) {
    if(children.length === 0)
      return;
    else {
      children.forEach((item) => {
        $scope.group_hash[item['ID']] = item['name'];
        $scope.groups.push({
          name: item['name'],
          id: item['ID']
        });
        $scope.findGroupInTree(item['childrenSections']);
      });
    }
  };

  $scope.createGroup = function(){
    var group = {name: '新部门'};
    group.name = $scope.checkItem(group, $scope.groups, 'name');
    $scope.groups.push(group);
  };

  $scope.checkItem = function(obj, arr, key){
    var i=0;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };

  $scope.deleteGroup = function(item){
    $scope.groups.splice($scope.groups.indexOf(item), 1);
  };

  $scope.selectGroup = function(item){    
    $scope.groups.forEach((item) => {
      item.selected = false;
    });
    $scope.group = item;
    $scope.group.selected = true;
    $scope.filter = item.id;
  };

  $scope.selectItem = function(item){    
    $scope.items.forEach((item) => {
      item.selected = false;
      item.editing = false;
    });
    $scope.item = item;
    $scope.item.selected = true;
  };

  $scope.deleteItem = function(item){
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'first')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.createItem = function(){
    var item = {
      group: 'Friends',
      avatar:'img/1.png'
    };
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
  };

  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.doneEditing = function(item){
    item.editing = false;
  };

}]);