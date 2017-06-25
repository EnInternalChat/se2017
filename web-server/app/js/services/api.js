'use strict';

angular.module('API.Services', [])
.service('API', ['$http', '$q', '$window', '$localStorage',
  function($http, $q, $window, $localStorage){
  var has_token = false;
  var loading_dom = null;
  var base_url = "https://ice.garenfeather.cn/EnInternalChat";
  var user = {};

  var obj2param = function(obj) {
    if(!obj)
      return '';
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
    for(name in obj) {
      value = obj[name];
      if(value instanceof Array) {
        for(i = 0; i < value.length; i++) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += obj2param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += obj2param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
    return query;
  }

  var get = function(url, param) {
    var deffered = $q.defer();
    $http({
      method: 'GET',
      url: url + '?' + obj2param(param),
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*",
        "x-auth-token": has_token ? $localStorage.token : ""
      }
    }).success(function(res) {
      deffered.resolve(res);
    }).error(function(error) {
      deffered.reject(error);
    });
    return deffered.promise;
  }

  var post = function(url, body) {
    var deffered = $q.defer();
    $http({
      method: 'POST',
      url: url,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*",
        "x-auth-token": has_token ? $localStorage.token : ""
      },
      data: body,
      transformRequest: function(obj) {
        return obj2param(obj);
      }
    }).success(function(data, status, headers) {
      deffered.resolve({
        body: data,
        headers: headers
      });
    }).error(function(error) {
      deffered.reject(error);
    });
    return deffered.promise;    
  }

  this.user_info = function() {
    return user;
  }

  this.loading = function() {
    if(!loading_dom) 
      loading_dom = angular.element(document.querySelector('#loading-bg'));
    loading_dom.css('display', 'flex');
  }

  this.stop_loading = function() {
    if(!loading_dom)
      loading_dom = angular.element(document.querySelector('#loading-bg'));
    loading_dom.css('display', 'none');
  }

  this.login = function(username, pwd) {
    return post(base_url + '/login', {
      name: username,
      password: pwd
    }).then(function(res) {
      if(!res.body.status)
        return {
          status: false,
          info: res.body.info
        }
      else {
        $localStorage.authenticated = true;
        has_token = true;
        $localStorage.token = res.headers['x-auth-token'];
        $localStorage.username = username;
        $localStorage.password = pwd;
        user = res.body;
        user['username'] = username;
        return { status: true }        
      }
    },
    function(error) {
      return {
        status: false,
        info: error.toString()
      }
    });
  }

  this.logout = function() {
    return post(base_url + '/logout', null).then(
      function(res) {
        $localStorage.authenticated = false;
        has_token = false;
        return true;
      },
      function(error) {
        return true;
      });
  }

  this.get_company_info = function() {
    return get(base_url + '/company/' + user.companyID, null);
  }

  this.get_all_employees = function() {
    return get(base_url + '/employees/' + user.companyID, null);
  }

  this.get_section_members = function(section_id) {
    return get(base_url + '/employees/' + user.companyID + '/' + section_id, null);
  }

  this.send_notice = function(receivers, title, content) {
    return post(base_url + '/notifications', {
      receivers: receivers,
      title: title,
      content
    });
  }


}]);