app.controller('AbnTestController', function($scope, $timeout, API, $state) {
  var apple_selected, tree;
  $scope.my_data = [];
  $scope.my_tree = tree = {};
  $scope.editing = false;
  $scope.members = [{name: 'asd'}, {name: '123'}, {name: 'qwe'}];

  apple_selected = function(branch) {
    return $scope.output = " " + branch.label;
  };

  format_tree_data = function(children) {
    $scope.editing = false;
    children['label'] = children['name'];
    children['children'] = children['childrenSections'];
    if(children['children'].length === 0) {
      return;
    }
    else {
      for(var i = 0, n = children['children'].length; i < n; i++) {
        format_tree_data(children['children'][i]);
      }
    }
  }

  $scope.my_tree_handler = function(branch) {
    $scope.item = branch;
    $scope.get_section_members($scope.item);
    console.log(branch);
  };

  $scope.get_tree_data = function() {
    API.loading();
    API.get_company_info().then(
      function(res) {
        res['is_root'] = true;
        res['label'] = res.name;
        res['children'] = [res.organization];
        $scope.my_data = [res];
        format_tree_data(res.organization);
        API.stop_loading();
        console.log($scope.my_data);
      })
  }

  $scope.try_async_load = function() {
    // $scope.my_data = [];
    $scope.doing_async = true;
    $scope.doing_async = false;
  };
  $scope.add_section = function() {
    var parent = tree.get_selected_branch();
    if(!parent || parent.is_root)
      API.alert('请先选中该部门的所属部门', $scope, function(){});
    else {
      API.loading();
      API.new_section(parent.ID, $scope.new_name, '').then(function(res) {
        API.stop_loading();
        tree.add_branch(parent, {
          label: $scope.new_name,
          data: res.body
        })
      })
    }
  };
  $scope.get_section_members = function(item) {
    if(item.is_root) {
      API.get_all_employees().then(
        function(res) {
          item.members_count = res.length;
        })
    }
    else {
      API.get_section_members(item.ID).then(
        function(res) {
          item['members'] = res;
          for(var i = 0, n = item['members'].length; i < n; i++) {
            if(item['members'][i].ID === item.leaderID) {
              item['leader'] = item['members'][i];
              return;
            }
          }
        });      
    }
  };
  $scope.section_detail = function(item) {
    $state.go('apps.contact', { 'selected_section': item.ID });
  };
  $scope.delete_item = function(item) {
    if(item.children.length > 0 || item.membersID.length > 0) {
      API.alert('子部门或成员不为空\n无法删除该部门', $scope, function(){});
    }
    else {
      API.alert('确认删除该部门？', $scope, function() {
        API.delete_section().then(function(res) {

        })
      })
    }
  }
  $scope.edit_item = function(item) {
    $scope.editing = true;
  }
  $scope.done_editing = function(item) {
    API.alert('确认保存修改？', $scope, function() {
      API.loading();
      API.update_section_info(item.ID, {
        name: item.name,
        description: item.note,
        leaderID: item.leader.ID
      }).then(function(res) {
        $scope.editing = false;
        item.leaderID = item.leader.ID;
      })
    })
  }


  $scope.get_tree_data();

});