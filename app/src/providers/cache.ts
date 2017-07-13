import { StorageHelper } from './storage_helper';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpCache {
  private ttl: number = 3600; // 1 hour  
  public constructor(
    private storage: StorageHelper) {
  }

  private expire() {
    return (new Date().getTime() + this.ttl * 1000);
  }

  public save(key: string, value: any, group_key: string) {
    return this.storage.storage_info(key, {
      value: value,
      expires: this.expire(),
      group_key: group_key
    }).then((res) => res.value);
  }

  public append(key: string, value: any, group_key: string) {
    return this.storage.read_local_info(key, []).then((data) => {
      if(data.expires < new Date().getTime()) {
        return Promise.reject('');
      }
    });
  }

  public read(key) {
    return this.storage.read_local_info(key, null).then((data) => {
      if(!data)
        return Promise.reject('');
      else {
        if(data.expires < new Date().getTime()) {
          return Promise.reject('');
        }
        return data.value;
      }
    });
  }

  public clean_group(group_key) {
    let p_clean = [];
    return this.storage.for_each((val, key) => {
      if(val && val.group_key === group_key)
        p_clean.push(this.storage.remove(key));
    }).then(() => {
      return Promise.all(p_clean);
    })
  }

  public get(key, group, resolve) {
    return this.read(key).then((res) => {
      console.log("Get Cache: ", res);
      return res;
    }).catch(() => {
      return resolve.then((res) => {
        return this.save(key, res, group).then((res) => {
          console.log("Request: ", res);
          return res;
        });
      })
    });
  }



}