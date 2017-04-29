import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppGlobal } from './global_data'

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
@Injectable()
export class HTTPService {

  private request_options: RequestOptions;
  private base_url: string;

  constructor(public http: Http) {
    console.log('Hello LoginService Provider');
    this.request_options = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/x-www-form-urlencoded"
      })
    });
    this.base_url = AppGlobal.get_instance().server_url;
  }

  public get(url: string, param: any):Promise<any> 
  {
    return new Promise((resolve, reject) => 
    {
      this.http.get(this.base_url + url + this.dict_to_query_str(param))
      .map(res => res.json())
      .subscribe(
        data => resolve(data),
        error => console.log(error))
    });
  }

  public post(url: string, param: any): Promise<any>
  {
    return new Promise((resolve, reject) => 
    {
      this.http.post(this.base_url + url,
        this.dict_to_query_str(param, false), this.request_options)
      .map(res => res.json())
      .subscribe(
        data => resolve(data),
        error => console.log(error))
    });
  }

  private dict_to_query_str(obj: any, is_param: boolean = true): string 
  {
    let str_array = [];
    for(let key in obj) 
    {
      key = encodeURIComponent(key);
      let values = obj[key];
      if(values && values.constructor == Array) 
      {
        let value_pair_array = [];
        for(let i = 0, n = values.length; i < n; i++) {
          value_pair_array.push(this.to_query_pair(key, values[i]));
        }
        str_array.concat(value_pair_array);
      }
      else
        str_array.push(this.to_query_pair(key, values));
    }
    if(is_param)
      return '?' + str_array.join('&');
    else
      return str_array.join('&');
  }

  private to_query_pair(key:any, value: any): any {
    if(value === undefined)
      return key;
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }

}
