import { Injectable } from '@angular/core';
import { HTTPService } from './http_helper';
import { AppGlobal } from './global_data';
import { Headers, RequestOptions } from '@angular/http';
import { CacheService } from "ionic-cache";
import { StorageHelper } from './storage_helper';

// class PageCache {
//   private pages = [];
//   public hit(page, )
// }

@Injectable()
export class API {

  private options: RequestOptions;
  private options_token: RequestOptions;
  private options_json: RequestOptions;  
  private options_token_json: RequestOptions;

  private is_debug: boolean = false;
  // public base_url: string = this.is_debug ? "" : "https://118.89.110.77/EnInternalChat";
  // public base_url: string = this.is_debug ? "" : "https://t.garenfeather.cn/EnInternalChat";
  public base_url: string = this.is_debug ? "" : "http://10.42.0.186";

  constructor(
    private http: HTTPService,
    private data: AppGlobal,
    private cache: CacheService,
    private storage: StorageHelper) {
    this.cache.setDefaultTTL(60 * 60);
    this.options = new RequestOptions({
      headers: new Headers({
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Platform": "app"
      })
    });
    this.options_json = new RequestOptions({
      headers: new Headers({
        "Accept": "*/*",
        "Content-type": "application/json",
        "Platform": "app"
      })
    });
    this.options_token = new RequestOptions({
      headers: new Headers({
        "Accept": "*/*",
        "Content-type": "application/x-www-form-urlencoded",
        "x-auth-token": this.data.token,
        "Platform": "app"
      })
    });  
    this.options_token_json = new RequestOptions({
      headers: new Headers({
        "Accept": "*/*",
        "Content-type": "application/json",
        "x-auth-token": this.data.token,
        "Platform": "app"
      })
    }); 
  }

  // public do_refresh(page_name) {
  //   this.
  // }

  public update_token() {
    this.options_token = new RequestOptions({
      headers: new Headers({
        "Accept": "*/*",
        "Content-type": "application/x-www-form-urlencoded",
        "x-auth-token": this.data.token,
        "Platform": "app"
      })
    });
    this.options_token_json = new RequestOptions({
      headers: new Headers({
        "Accept": "*/*",
        "Content-type": "application/json",
        "x-auth-token": this.data.token,
        "Platform": "app"
      })
    }); 
  }

  public get_cache(key, group_key, param?) {
    return this.cache.getItem(key).catch(() => {
      return this.http.get(key, param, this.options_token).then((res) => {
        return this.cache.saveItem(key, res, group_key);
      })
    })
  }

  public clean_cache(group_key) {
    let p_clean = [];
    return this.storage.for_each((val, key) => {
      if(val && val.groupKey === group_key)
        p_clean.push(this.storage.remove(key));
    }).then(() => {
      return Promise.all(p_clean);
    })
  }

  public login(username, password) {
    return this.http.post(this.base_url + '/login', {
      name: username,
      password: password
    }, this.options);
  }

  public logout() {
    this.data.clear_remember_data();
    return this.http.post(this.base_url + '/logout', null, 
      this.options_token);
  }

  public signin(user, token) {
    this.data.set_avator_no(user['avatar']);
    this.data.user_name = user['username'];
    this.data.user_id = user['ID'];
    this.data.company_id = user['companyID'];
    this.data.section_id = user['sectionID'];
    this.data.token = token;
    this.update_token();
    this.get_personal_info().then((res) => {
      this.data.personal = res;
      this.data.job = (res.leader ? '部长' : '部员');
    })
  }

  public get_notices(not_read: boolean) {
    let group_key = "notices";
    let url_key;
    if(not_read) {
      url_key = this.base_url + '/notifications/received/unread/' + this.data.user_id;
    }
    else {
      url_key = this.base_url + '/notifications/received/read/' + this.data.user_id;
    }
    return this.cache.getItem(url_key).then((res) => {
      console.log("get: ", res);
      return res;
    }).catch(() => {
      return this.http.get(url_key, null, this.options_token).then((res) => {
        return this.cache.saveItem(url_key, res, group_key).then((res) => {
          console.log("Not get: ", res);
          return CacheService.decodeRawData(res);
        });
      })
    })
  }

  public read_notice(notice_id) {
    return this.http.get(this.base_url + '/notifications/' + this.data.user_id 
      + '/' + notice_id, null, this.options_token);
  }

  public get_tasks(is_doing: boolean) {
    return this.http.get('/assets/data/tasks.json', null, this.options_token);
    // if(is_doing) {
    //   return this.http.get(this.base_url + '/tasks/working/' + 
    //     this.data.company_id + '/' + this.data.user_id, null, this.options_token);      
    // }
    // else {
    //   return this.http.get(this.base_url + '/tasks/over/' +
    //     this.data.company_id + '/' + this.data.user_id, null, this.options_token);
    // }
  }

  public get_tasks_type() {
    return this.http.get(this.base_url + '/tasks/all/' 
      + this.data.company_id, null, this.options_token);
  }

  public start_task(process_key, comment) {
    return this.http.post(this.base_url + '/tasks/start/' + process_key, {
      comment: comment
    }, this.options_token);
  }

  public operate_task(task_type, task_id, operation_id, other) {
    return this.http.post(this.base_url + '/tasks/operate/' + task_id, {
      processKey: task_type,
      processID: task_id,
      operationID: operation_id,
      content: other
    }, this.options_token);
  }

  public get_personal_info() {
    let group_key = "personal";
    let url_key = this.base_url + '/employees/' + this.data.company_id
      + '/' + this.data.section_id + '/' + this.data.user_id;
    // return this.cache.getItem(url_key).catch(() => {
    //   return this.http.get(url_key, null, this.options_token).then((res) => {
    //     return this.cache.saveItem(url_key, res, group_key);
    //   })
    // })
    return this.http.get(url_key, null, this.options_token);
  }

  public update_personal(info) {
    return this.http.post(this.base_url + '/employees/' + this.data.company_id
      + '/' + this.data.section_id + '/' + this.data.user_id, 
      info, this.options_token);
  }

  public get_all_employees(page, limit) {
    return this.http.get(this.base_url + '/employees/' 
      + this.data.company_id, {
        page: page,
        limit: limit
      }, this.options_token);
  }

  public get_group_sections() {
    let url_key = this.base_url + '/company/' + this.data.company_id 
      + '/sections/' + this.data.section_id;
    return this.http.get(url_key, null, this.options_token);
  }

  public start_group_chat(group_list) {
    return this.http.post(this.base_url + '/chats/group/' + this.data.company_id 
      + '/' + this.data.section_id + '/' + this.data.user_id, {
      groupIDList: group_list
    }, this.options_token);
  }

}