import { Injectable } from '@angular/core';
import { HTTPService } from './http_helper';
import { AppGlobal } from './global_data';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class API {
  private options: RequestOptions;
  private options_token: RequestOptions;  
  private is_debug: boolean = true;
  public base_url: string = this.is_debug ? "" : "http://http://118.89.110.77:8080/EnInternalChat";

  constructor(
    private http: HTTPService,
    private global_data: AppGlobal) {
    this.options = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/x-www-form-urlencoded"
      })
    });
    this.options_token = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/x-www-form-urlencoded",
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
  }

  public login(username, password) {
    return this.http.post(this.base_url + '/login', {
      name: username,
      password: password
    }, this.options);
  }

  public logout() {
    return this.http.post(this.base_url + '/logout', null, this.options_token);
  }

  public get_notice(username) {
    return this.http.get(this.base_url + '/notifications/received/' 
      + this.global_data.user_name, null, this.options_token);
  }

  public read_notice(notice_id) {
    return this.http.get(this.base_url + '/notifications/' + notice_id, 
      null, this.options_token);
  }

  public update_personal(info) {
    return this.http.post(this.base_url + '/employees/' + this.global_data.user_name, 
      info, this.options_token);
  }
}