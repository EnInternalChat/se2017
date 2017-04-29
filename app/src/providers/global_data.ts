import { StorageHelper } from './storage_helper';
import { MD5 } from './secure_md5';

export const enum AppLanguage {
  CN = 1,
  EN = 2
}


// storage some useful value 
export class AppGlobal {
  private static instance: AppGlobal;

  private _user_name: string;
  private _avator_no: number;
  private md5_helper: MD5;

  private storage: StorageHelper = StorageHelper.get_instance();

  public is_debug: boolean = true;
  public server_url: string = this.is_debug ? "http://" : "http://";
  public language: AppLanguage = AppLanguage.CN;

  private constructor() 
  {
    this.md5_helper = new MD5();
    Promise.all([this.read_username(), this.read_avator_no()]).then(() => {
      console.log("In Global(avator): ", this._avator_no);
      console.log("In Global(username): ", this._user_name);
    });
  }

  private read_username() {
    return this.storage.read_local_info("username", "username@outlook.com").then((value) => 
    {
      return this._user_name = value;
    });
  }

  private read_avator_no() {
    return this.storage.read_local_info("avator_no", 2).then((value) => 
    {
      return this._avator_no = value;
    });
  }

  public static get_instance(): AppGlobal {
    if(AppGlobal.instance == undefined) {
      AppGlobal.instance = new AppGlobal();
    }
    return AppGlobal.instance;
  }

  set user_name(username: string) {
    this._user_name = username;
    this.storage.storage_info('username', username);
  }
  get user_name(): string {
    return this._user_name;
  }

  set avator_no(no: number) {
    this._avator_no = no;
    this.storage.storage_info('avator_no', no);
  }
  get avator_no(): number {
    return this._avator_no;
  }
}
