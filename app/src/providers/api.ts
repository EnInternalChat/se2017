import { Injectable } from '@angular/core';
import { HTTPService } from './http_helper';
import { AppGlobal } from './global_data';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class API {
  private options_json: RequestOptions;
  private options_token: RequestOptions;
  private options_token_json: RequestOptions;

  private is_debug: boolean = true;
  public base_url: string = this.is_debug ? "" : "http://http://118.89.110.77:8080/EnInternalChat";

  constructor(
    private http: HTTPService,
    private global_data: AppGlobal) {
    this.options_json = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/json"
      })
    });
    this.options_token = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/x-www-form-urlencoded",
        "x-auth-token": this.global_data.token
      })
    });  
    this.options_token_json = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/json",
        "x-auth-token": this.global_data.token
      })
    }); 
  }

  public update_token() {
    this.options_token = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/x-www-form-urlencoded",
        "x-auth-token": this.global_data.token
      })
    });
    this.options_token_json = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/json",
        "x-auth-token": this.global_data.token
      })
    }); 
  }

  public login(username, password) {
    return this.http.post(this.base_url + '/login', {
      name: username,
      password: password
    }, this.options_json);
  }

  public logout() {
    return this.http.post(this.base_url + '/logout', null, 
      this.options_token_json);
  }

  public get_notice() {
    if(this.is_debug)
      return this.http.get(this.base_url + 'assets/data/notices.json', null);
    return this.http.get(this.base_url + '/notifications/received/' 
      + this.global_data.user_name, null, this.options_token);
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
    }, this.options_token_json);
  }

  public operate_task(task_type, task_id, operation_id, other?) {
    return this.http.post(this.base_url + '/tasks/operate/' + task_id, {
      processKey: task_type,
      processID: task_id,
      operationID: operation_id,
      content: other
    }, this.options_token_json);
  }

  public update_personal(info) {
    return this.http.post(this.base_url + '/employees/' + this.global_data.user_name, 
      info, this.options_token_json);
  }
}