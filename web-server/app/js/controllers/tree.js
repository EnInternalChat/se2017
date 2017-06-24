app.controller('AbnTestController', function($scope, $timeout, API) {
  var apple_selected, tree;
  $scope.my_data = [];
  $scope.my_tree = tree = {};

  apple_selected = function(branch) {
    return $scope.output = " " + branch.label;
  };

  format_tree_data = function(children) {
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
    var _ref;
    $scope.output = "此处 " + branch.label;
    if ((_ref = branch.data) != null ? _ref.description : void 0) {
      return $scope.output += '(' + branch.data.description + ')';
    }
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
    $scope.my_data = [];
    $scope.doing_async = true;
    // return $timeout(function() {
    //   if (Math.random() < 0.5) {
    //     $scope.my_data = treedata_avm;
    //   } else {
    //     $scope.my_data = treedata_geography;
    //   }
    //   $scope.doing_async = false;
    //   return tree.expand_all();
    // }, 1000);
  };
  $scope.try_adding_a_branch = function() {
    var b;
    b = tree.get_selected_branch();
    return tree.add_branch(b, {
      label: $scope.new_name,
      data: {
        something: 42,
        "else": 43
      }
    });
  };

  $scope.get_tree_data();

});