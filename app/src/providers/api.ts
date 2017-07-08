import { Injectable } from '@angular/core';
import { HTTPService } from './http_helper';
import { AppGlobal } from './global_data';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class API {

  private options: RequestOptions;
  private options_token: RequestOptions;
  private options_json: RequestOptions;  
  private options_token_json: RequestOptions;

  private is_debug: boolean = false;
  public base_url: string = this.is_debug ? "" : "https://t.garenfeather.cn/EnInternalChat";

  constructor(
    private http: HTTPService,
    private global_data: AppGlobal) {
    this.options = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      })
    });
    this.options_json = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    });
    this.options_token = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/x-www-form-urlencoded",
        "x-auth-token": this.global_data.token,
        "Access-Control-Allow-Origin": "*"
      })
    });  
    this.options_token_json = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/json",
        "x-auth-token": this.global_data.token,
        "Access-Control-Allow-Origin": "*"
      })
    }); 
  }

  public update_token() {
    this.options_token = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/x-www-form-urlencoded",
        "x-auth-token": this.global_data.token,
        "Access-Control-Allow-Origin": "*"
      })
    });
    this.options_token_json = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/json",
        "x-auth-token": this.global_data.token,
        "Access-Control-Allow-Origin": "*"
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
    return this.http.post(this.base_url + '/logout', null, 
      this.options_token);
  }

  public signin(user, token) {
    this.global_data.set_avator_no(user['avatar']);
    this.global_data.user_name = user['username'];
    this.global_data.user_id = user['ID'];
    this.global_data.company_id = user['companyID'];
    this.global_data.section_id = user['sectionID'];
    this.global_data.token = token;
    this.update_token();
    this.get_personal_info().then((res) => {
      this.global_data.personal = res;
      this.global_data.job = (res.leader ? '部长' : '部员');
    })
  }

  public get_notices(not_read: boolean) {
    // if(this.is_debug)
      // return this.http.get(this.base_url + 'assets/data/notices.json', null);
    if(not_read) {
      return this.http.get(this.base_url + '/notifications/received/unread/' 
        + this.global_data.user_id, null, this.options_token);
    }
    else {
      return this.http.get(this.base_url + '/notifications/received/read/' 
        + this.global_data.user_id, null, this.options_token);      
    }
  }

  public read_notice(notice_id) {
    return this.http.get(this.base_url + '/notifications/' + notice_id, 
      null, this.options_token);
  }

  public get_tasks_type() {
    return this.http.get(this.base_url + '/tasks/all/' 
      + this.global_data.personal.company_id, null, this.options_token);
  }

  public start_task(task_id, comment) {
    return this.http.post(this.base_url + '/tasks/start/' + task_id, {
      comment: comment
    }, this.options_token);
  }

  public operate_task(task_type, task_id, operation_id, other?) {
    return this.http.post(this.base_url + '/tasks/operate/' + task_id, {
      processKey: task_type,
      processID: task_id,
      operationID: operation_id,
      content: other
    }, this.options_token);
  }

  public get_personal_info() {
    return this.http.get(this.base_url + '/employees/' + this.global_data.company_id
      + '/' + this.global_data.section_id + '/' + this.global_data.user_id, 
      null, this.options_token);
  }

  public update_personal(info) {
    return this.http.post(this.base_url + '/employees/' + this.global_data.company_id
      + '/' + this.global_data.section_id + '/' + this.global_data.user_id, 
      info, this.options_token);
  }

  public get_all_employees(page, limit) {
      return this.http.get(this.base_url + '/employees/' 
        + this.global_data.company_id, {
          page: page,
          limit: limit
        }, this.options_token);
  }

  public get_tasks(is_doing: boolean) {
    return this.http.get(this.base_url + '/tasks/doing', {}, this.options_token);
  }

}