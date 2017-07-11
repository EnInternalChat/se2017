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

  var find_notice = function(id) {
    for(var i = 0, n = mails.length; i < n; i++) {
      if(mails[i].ID === parseInt(id)) {
        break;
      }
    }
    return i % mails.length;
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
    var i = find_notice(id);
    if(mails[i].fold === 'unread') {
      return API.read_notice(mails[i].ID).then(function(res) {
        console.log(res);
        mails[i].fold = 'read';
        return mails[i];
      });      
    }
    else {
      return Promise.resolve(mails[i]);
    }
  };
  factory.delete_notice = function(id) {
    var i = find_notice(id);
    if(mails[i].fold === 'read' || mails[i].fold === 'unread') {
      return API.delete_received_notice(id).then(function(res) {
        return res;
      })
    }
    else {
      return API.delete_send_notice(id).then(function(res) {
        return res;
      })
    }
  }
  return factory;
}])
.factory('tasks', ['API', function(API){
  var tasks = [];
  var factory = {};
  factory.get_all = function() {
    API.get_tasks().then(function(res) {

    })
  }
  factory.delete_task = function(id) {
    API.delete_task(id).then(function(res) {

    })
  }
  factory.update_task = function(id, name) {
    API.update_task(id, name).then(function(res) {

    })
  }
  factory.new_task = function(name, file) {
    API.new_task(name, file).then(function(res) {
      
    })
  }
  return factory;
}])