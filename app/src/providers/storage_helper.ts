import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageHelper {
  
  public constructor(private storage: Storage) {
    this.storage.ready().then();
  }

  public storage_info(key: any, value: any): void {
    this.storage.set(key, value);
  }

  public read_local_info(key: any, default_value: any): Promise<any> 
  {
    return this.storage.ready().then(() => {
      return this.storage.get(key).then(
        (value) => {
          if(value != null) {
            return value;
          }
          else {
            return default_value;
          }
        },
        (reason) => {
          return default_value;
        });
    });
  }

  public remove(key): Promise<any> {
    return this.storage.ready().then(() => {
      return this.storage.remove(key);
    });
  }

  public for_each(resolve): Promise<any> {
    return this.storage.ready().then(() => {
      return this.storage.forEach((val, key) => {
        return resolve(val, key);
      });
    })
  }

  public clear(): Promise<any> {
    return this.storage.ready().then(() => {
      return this.storage.clear();
    })
  }

}