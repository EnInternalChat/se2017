import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
@Injectable()
export class HTTPService {

  private request_options: RequestOptions;
  private is_debug: boolean = true;
  public base_url: string = this.is_debug ? "" : "http://123.206.121.176:8888/EnInternalChat";

  constructor(
    public http: Http) {
    this.request_options = new RequestOptions({
      headers: new Headers({
        "Content-type": "application/x-www-form-urlencoded"
      })
    });
  }

  public get(url: string, param: any):Promise<any> 
  {
    return new Promise((resolve, reject) => 
    {
      this.http.get(this.base_url + url + this.dict_to_query_str(param))
      .map(res => res.json())
      .subscribe(
        data => resolve(data),
        error => reject(error))
    });
  }

  public post(url: string, param: any): Promise<any>
  {
    return new Promise((resolve, reject) => 
    {
      this.http.post(this.base_url + url + this.dict_to_query_str(param),
        null, this.request_options)
      .map(res => res.json())
      .subscribe(
        data => resolve(data),
        error => reject(error))
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
