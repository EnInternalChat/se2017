app.controller('AbnTestController', function($scope, $timeout) {
    var apple_selected, tree, treedata_avm, treedata_geography;
    $scope.my_tree_handler = function(branch) {
      var _ref;
      $scope.output = "此处 " + branch.label;
      if ((_ref = branch.data) != null ? _ref.description : void 0) {
        return $scope.output += '(' + branch.data.description + ')';
      }
    };
    apple_selected = function(branch) {
      return $scope.output = " " + branch.label;
    };
    treedata_avm = [
      {
        label: '第一分公司',
        children: [
          {
            label: '程序部',
            data: {
              description: ""
            }
          }, {
            label: '设计部',
            data: {
              description: ""
            }
          }, {
            label: '财政部',
            data: {
              description: ""
            }
          }, {
            label: '业务部',
            children: ['技术部', '开发部', '客服部']
          }
        ]
      }, {
        label: '第二分公司',
        data: {
          definition: "第二分公司",
          data_can_contain_anything: true
        },
        onSelect: function(branch) {
          return $scope.output = " " + branch.data.definition;
        },
        children: [
          {
            label: '程序部'
          }, {
            label: '财政部',
            children: [
              {
                label: '财务部',
                onSelect: apple_selected
              }, {
                label: '行政部',
                onSelect: apple_selected
              }, {
                label: '人力资源部',
                onSelect: apple_selected
              }
            ]
          }
        ]
      }, {
        label: '第三分公司',
        children: [
          {
            label: '业务部',
            children: ['开发部', '网络部', 'APP部']
          }, {
            label: '行政部',
            children: ['财务部', '人力资源部', '行政部']
          }, {
            label: '市场部',
            children: [
              {
                label: '客服部',
                children: ['在线', '人工', '语音', '智能']
              }, {
                label: '服务部',
                children: ['修理部', '保修处', '人工服务', '智能服务部', '赔偿处']
              }
            ]
          }
        ]
      }
    ];
    treedata_geography = [
      {
        label: '公司',
        children: [
          // {
          //   label: '部门',
          //   children: ['部门1', '部门2']
          // }
        ]
      }
    ];
    $scope.my_data = treedata_avm;
    $scope.try_changing_the_tree_data = function() {
      if ($scope.my_data === treedata_avm) {
        return $scope.my_data = treedata_geography;
      } else {
        return $scope.my_data = treedata_avm;
      }
    };
    $scope.my_tree = tree = {};
    $scope.try_async_load = function() {
      $scope.my_data = [];
      $scope.doing_async = true;
      return $timeout(function() {
        if (Math.random() < 0.5) {
          $scope.my_data = treedata_avm;
        } else {
          $scope.my_data = treedata_geography;
        }
        $scope.doing_async = false;
        return tree.expand_all();
      }, 1000);
    };
    return $scope.try_adding_a_branch = function() {
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
});