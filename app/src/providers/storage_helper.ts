import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

@Injectable()
export class StorageHelper {
  private static storage_way: string = "indexeddb";
  private static instance: StorageHelper;

  private secure_storage: SecureStorageObject;

  private constructor(private storage: Storage, secureStorage: SecureStorage) {
    this.storage.ready().then();
    secureStorage.create('').then((secureObject: SecureStorageObject) => {
      this.secure_storage = secureObject;
    });
  }

  public static get_instance(): StorageHelper {
    if(StorageHelper.instance == undefined) {
      StorageHelper.instance = new StorageHelper(
        new Storage(StorageHelper.storage_way),
        new SecureStorage());
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
          console.log("Secure info read: ", value);
          if(value != null)
            return value;
          else
            return default_value;
        },
        (reason) => {
          return default_value;
        });
    });
    // return this.secure_storage.get(key).then(
    //   data => {
    //     console.log("Secure info read: ", data);
    //     if(data != null)
    //       return data;
    //     else
    //       return default_value;
    //   });
    // console.log("Default Valid read: ", key, ", ", default_value);
    // return default_value;
  }

  public storage_secure_info(key: any, value: any): void {
    // this.secure_storage.set(key, value).then(
    //   data => {},
    //   error => { console.log(error); });
  }

  public remove_secure_info(key: any): void {
    this.secure_storage.remove('key').then(
      data => {},
      error => { console.log(error); });
  }

}