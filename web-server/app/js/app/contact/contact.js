app.controller('ContactCtrl', ['$scope', 'API', '$filter', '$stateParams',
  function($scope, API, $filter, $stateParams) {
  // $http.get('js/app/contact/contacts.json').then(function (resp) {
  //   $scope.items = resp.data.items;
  //   $scope.item = $filter('orderBy')($scope.items, 'first')[0];
  //   $scope.item.selected = true;
  // });

  $scope.filter = '';
  $scope.groups = [];
  $scope.group_hash = new Array();
  $scope.items = [];


  API.get_company_info().then(function(res) {
    var root_section = res.organization;
    $scope.group_hash[root_section['ID']] = root_section['name'];
    $scope.groups.push({
      name: root_section['name'],
      id: root_section['ID']
    });
    $scope.findGroupInTree(root_section['childrenSections']);
    if($stateParams['selected_section']) {
      $scope.selectGroup($scope.findGroupInList(
        parseInt($stateParams.selected_section)));
    }
  });

  API.get_all_employees().then(function(res) {
    res.forEach((item) => {
      $scope.items.push({
        id: item['ID'],
        group_id: item['sectionID'],
        group_name: "",
        name: item['name'],
        avatar: "img/" + (item['avatar'] + 1) + ".png",
        phone: item['phone'][0],
        other_phone: item['phone'][1],
        email: item['email'][0],
        other_email: item['email'][1],
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

  $scope.findGroupInList = function(id) {
    for(var i = 0, n = $scope.groups.length; i < n; i++) {
      if($scope.groups[i].id === id)
        return $scope.groups[i];
    }
    return $scope.groups[0];
  }

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
    API.alert('确认删除该用户吗？', $scope, function() {
      API.delete_employee($scope.group.id, item.id).then(function(res) {
        console.log(res);
      })
      // $scope.items.splice($scope.items.indexOf(item), 1);
      // $scope.item = $filter('orderBy')($scope.items, 'first')[0];
      // if($scope.item) {
      //   $scope.item.selected = true;
      // }
    })
  };

  $scope.createItem = function(){
    API.alert_prompt('新建用户', '用户姓名', function(name) {
      API.new_employee($scope.group.id, name, "部员").then(function(res){
        console.log(res);
      })
      // var item = {
      //   name: name
      //   group_id: $scope.group.id,
      //   avatar:'img/1.png'
      // };
      // $scope.items.push(item);
      // $scope.selectItem(item);
      // $scope.item.editing = true;
    })
  };

  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.doneEditing = function(item){
    API.alert('确认保存修改?', $scope, function() {
      API.loading();
      API.update_employee_info($scope.group.id, item.id, {
        email1: item.email,
        email2: item.other_email,
        phone1: item.phone,
        phone2: item.other_phone,
        newSectionID: item.group_id
      }).then(function(res) {
        API.stop_loading();
        item.editing = false;
      });      
    });
  };

}]);