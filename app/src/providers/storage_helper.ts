import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

@Injectable()
export class StorageHelper {
  private static storage_way: string = "indexeddb";
  private static instance: StorageHelper;

  private secure_storage: SecureStorageObject;

  private constructor(private storage: Storage) {
    this.storage.ready().then();
  }

  public static get_instance(): StorageHelper {
    if(StorageHelper.instance == undefined) {
      StorageHelper.instance = new StorageHelper(
        new Storage(StorageHelper.storage_way));
    }
    return StorageHelper.instance;
  }

  public storage_info(key: any, value: any): void {
    console.log("Valid in: ", key, value);
    this.storage.set(key, value);
  }

  public read_local_info(key: any, default_value: any): Promise<any> 
  {
    return this.storage.ready().then(() => {
      return this.storage.get(key).then(
        (value) => {
          if(value != null) {
            console.log("Valid read: ", key, ", ", value);
            return value;
          }
          else {
            console.log("Valid read: ", key, ", ", default_value);
            return default_value;
          }
        },
        (reason) => {
          console.log("Default Valid read: ", key, ", ", default_value);
          return default_value;
        });
    });

  }

  public read_secure_local_info(key: any, default_value: any): Promise<any> {
    return this.storage.ready().then(() => {
      return this.storage.get(key).then(
        (value) => {
          if(value != null) {
            console.log("Secure read: ", key, ", ", value);
            return value;
          }
          else {
            console.log("Secure read: ", key, ", ", default_value);
            return default_value;
          }
        },
        (reason) => {
          console.log("Default Secure read: ", key, ", ", default_value);
          return default_value;
        });
    });
  }

  public storage_secure_info(key: any, value: any): void {
    console.log("Storage value: ", key, ", ", value);
    this.storage.set(key, value);
  }

  public remove_secure_info(key: any): void {
    this.secure_storage.remove('key').then(
      data => {},
      error => { console.log(error); });
  }

}