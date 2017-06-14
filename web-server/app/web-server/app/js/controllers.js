/*
angular.module('internalChat.controllers')
*/
/*
.controller('loginCtrl', function ($rootScope, $scope, $window, $location) {
    $scope.username = "huihui123";
    $scope.userpassword = "123456";
//    var datausername,datauserpassword;
//    $http.get("/try/angularjs/data/Customers_MySQL.php")
//       .success(function (response) {
//            datausername = response.records;
//            datapassword = response.records;
//       });
    $scope.login_click = function(){
      //  if(username.equalTo(datausername) && userpassword.equalTo(datapassword))
            $window.location.href = ('#/setting');
      //  else
      //      $window.alert("账号或密码错误！请重新输入");
    };
})

.controller('noticeCtrl', function($rootScope, $scope, $window) {

})

.controller('userCtrl', function($rootScope, $scope, $window) {

})

.controller('taskCtrl', function($rootScope, $scope, $window) {

})

.controller('settingCtrl',function($rootScope ,$scope, $window){
    $scope.text = "test";
});
*/

angular.module('internalChat.controllers')

    .controller('HomeCtrl', function ($rootScope, $scope, $window) {
        $scope.message = "自定义信息";
        /* 下面这句是编辑器需要的*/
        var editor = new EpicEditor({basePath: 'lib/epiceditor'}).load();

        $scope.go_to_login = function() {
            $window.location.href = ('#/login');
        }
    })

    .controller('LoginCtrl', function($rootScope, $scope, $window) {
        $scope.message = "登录信息";
    });


