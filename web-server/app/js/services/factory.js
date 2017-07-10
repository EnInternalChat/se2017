angular.module('Factories', [])
.factory('mails', ['API', function(API){
  var mails = [];

  var get_read_notice = function() {
    return API.get_receive_notice(true).then(function(res) {
      res.forEach(function(item) {
        item['fold'] = 'read';
      });
      mails = mails.concat(res);
      return true; 
    });
  }
  var get_unread_notice = function() {
    return API.get_receive_notice(false).then(function(res) {
      res.forEach(function(item) {
        item['fold'] = 'unread';
      })
      mails = mails.concat(res);
      return true;
    });
  }
  var get_send_notice = function() {
    return API.get_send_notice().then(function(res) {
      res.forEach(function(item) {
        item['fold'] = 'send';
      });
      mails = mails.concat(res);
      return true;
    });
  }

  var factory = {};
  factory.get_mails = function (tag) {
    mails = [];
    if(tag === '') {
      API.loading();
      return Promise.all([
        get_read_notice(), 
        get_unread_notice(), 
        get_send_notice()]).then(function(res) {
        API.stop_loading();
        return mails;
      })
    }
    else if(tag === 'read') {
      API.loading();
      return Promise.all([get_read_notice()]).then(function(res) {
        API.stop_loading();
        return mails;
      })
    }
    else if(tag === 'unread') {
      API.loading();
      return Promise.all([get_unread_notice()]).then(function(res) {
        API.stop_loading();
        return mails;
      })
    }
    else {
      API.loading();
      return Promise.all([get_send_notice()]).then(function(res) {
        API.stop_loading();
        return mails;
      })
    }
  };
  factory.get_detail = function (id) {
    for(var i = 0, n = mails.length; i < n; i++) {
      if(mails[i].ID === parseInt(id))
        return mails[i];
    }
    return mails[0];
  };
  return factory;
}])
.factory('tasks', ['API', function(API){
  var tasks = [];
  var factory = {};
  factory.get_all = function() {
    
  }
  return factory;
}])