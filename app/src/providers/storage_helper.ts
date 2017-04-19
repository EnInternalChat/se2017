import { Storage } from '@ionic/storage';

export class StorageHelper {
  private static storage_way: string = "indexeddb";
  private static instance: StorageHelper;
  private storage: Storage;

  private constructor(storage: Storage) {
    this.storage = storage;
  }
  public static getInstance(): StorageHelper {
    if(!StorageHelper.instance) {
      StorageHelper.instance = new StorageHelper(new Storage(StorageHelper.storage_way));
    }
    return StorageHelper.instance;
  }

  public storage_info(key: any, value: any): void {
    this.storage.ready().then(() => {
      this.storage.set(key, value);
    });
  }

  public read_local_info(key: any, default_value: any): any {
    this.storage.ready().then(() => {
      this.storage.get(key).then((value) => {
        return value;
      })
    });
    return default_value;
  }

}