import { Injectable } from '@angular/core';
import { HTTPService } from './http_helper';
import { AppGlobal } from './global_data';
import { Headers, RequestOptions } from '@angular/http';
import { CacheService } from "ionic-cache";

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
  public base_url: string = this.is_debug ? "" : "https://118.89.110.77/EnInternalChat";
  // public base_url: string = this.is_debug ? "" : "https://t.garenfeather.cn/EnInternalChat";
  // public base_url: string = this.is_debug ? "" : "http://10.42.0.186";

  constructor(
    private http: HTTPService,
    private data: AppGlobal,
    private cache: CacheService) {
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
    // if(this.is_debug)
      // return this.http.get(this.base_url + 'assets/data/notices.json', null);
    if(not_read) {
      return this.http.get(this.base_url + '/notifications/received/unread/' 
        + this.data.user_id, null, this.options_token);
    }
    else {
      return this.http.get(this.base_url + '/notifications/received/read/' 
        + this.data.user_id, null, this.options_token);      
    }
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
      + this.data.personal.company_id, null, this.options_token);
  }

  public start_task(task_id, comment) {
    return this.http.post(this.base_url + '/tasks/start/' + task_id, {
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
    return this.http.get(this.base_url + '/employees/' + this.data.company_id
      + '/' + this.data.section_id + '/' + this.data.user_id, 
      null, this.options_token);
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
    return this.http.get(this.base_url + '/company/' + this.data.company_id 
      + '/sections/' + this.data.section_id, null, this.options_token);
  }

  public start_group_chat(group_list) {
    return this.http.post(this.base_url + '/chats/group/' + this.data.company_id, {
      groupIDList: group_list
    }, this.options_token);
  }

}