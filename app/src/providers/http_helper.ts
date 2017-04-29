import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HTTPService {

  constructor(public http: Http) {
    console.log('Hello LoginService Provider');
  }

  public get(url: string, param: any):Promise<any> {
      return this.http.get(url, +)
  }

  private to_query_str(obj: any): string {

  }

  private to_query_pair(key:any, value: any): any {
      if(value === undefined)
          return key;
      return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }

}
