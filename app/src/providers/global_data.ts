import { StorageHelper } from './storage_helper';

export const enum AppLanguage {
  CN = 1,
  EN = 2
}

// storage some useful value 
export class AppGlobal {
  private static instance: AppGlobal;

  private _user_name: string;
  private _avator_no: number;

  public is_debug: boolean = true;
  public server_url: string = this.is_debug ? "http://" : "http://";
  public language: AppLanguage = AppLanguage.CN;

  private constructor() {
    let storage = StorageHelper.getInstance();
    this._avator_no = storage.read_local_info('avator_no', 1);
    this._user_name = storage.read_local_info('username', 'username@outlook.com');
  }
  public static get_instance(): AppGlobal {
    if(!AppGlobal.instance) {
      AppGlobal.instance = new AppGlobal();
    }
    return AppGlobal.instance;
  }

  set user_name(username: string) {
    StorageHelper.getInstance().storage_info('username', username);
  }
  get user_name(): string {
    return this._user_name;
  }

  set avator_no(no: number) {
    StorageHelper.getInstance().storage_info('avator_no', no);
  }
  get avator_no(): number {
    return this._avator_no;
  }
}
