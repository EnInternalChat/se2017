import { StorageHelper } from './storage_helper';

export const enum AppLanguage {
  CN = 1,
  EN = 2
}

// storage some useful value 
export class AppGlobal {
  private static instance: AppGlobal;

  public user_name: string;
  public avator_no: number;

  public is_debug: boolean = true;
  public server_url: string = this.is_debug ? "http://" : "http://";
  public language: AppLanguage = AppLanguage.CN;

  private constructor() {
    let storage = StorageHelper.getInstance();
    this.avator_no = storage.read_local_info('avator_no', 1);
    this.user_name = storage.read_local_info('username', 'username@outlook.com');
  }

  public static get_instance(): AppGlobal {
    if(!AppGlobal.instance) {
      AppGlobal.instance = new AppGlobal();
    }
    return AppGlobal.instance;
  }

  public 
}
