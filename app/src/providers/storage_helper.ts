import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

@Injectable()
export class StorageHelper {
  
  public constructor(private storage: Storage) {
    this.storage.ready().then();
  }

  public storage_info(key: any, value: any): void {
    // console.log("Valid in: ", key, value);
    this.storage.set(key, value);
  }

  public read_local_info(key: any, default_value: any): Promise<any> 
  {
    return this.storage.ready().then(() => {
      return this.storage.get(key).then(
        (value) => {
          if(value != null) {
            // console.log("Valid read: ", key, ", ", value);
            return value;
          }
          else {
            // console.log("Valid read: ", key, ", ", default_value);
            return default_value;
          }
        },
        (reason) => {
          // console.log("Default Valid read: ", key, ", ", default_value);
          return default_value;
        });
    });

  }

}