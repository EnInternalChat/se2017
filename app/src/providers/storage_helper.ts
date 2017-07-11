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

  public clear(): Promise<any> {
    return this.storage.ready().then(() => {
      return this.storage.clear();
    })
  }

}