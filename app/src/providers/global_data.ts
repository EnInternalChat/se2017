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
  private _avator_path: string;

  public job : string = "管理员";

  private md5_helper: MD5;
  private storage: StorageHelper = StorageHelper.get_instance();

  public is_debug: boolean = false;
  public server_url: string = this.is_debug ? "" : "http://123.206.121.176:8888/EnInternalChat";
  public language: AppLanguage = AppLanguage.CN;

  private constructor() 
  {
    this.md5_helper = new MD5();
    Promise.all([this.read_username(), this.read_avator_no()]).then(() => {
      console.log("In Global(avator): ", this._avator_path);
      console.log("In Global(username): ", this._user_name);
    });
  }

  private read_username() {
    return this.storage.read_local_info("username", "ZhangSan").then((value) => 
    {
      return this._user_name = value;
    });
  }

  private read_avator_no() {
    return this.storage.read_local_info("avator_no", 3).then((value) => 
    {
      return this._avator_path = "assets/img/avator/" + value + ".png";
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

  public set_avator_no(no: number) {
    this._avator_path = "assets/img/avator/" + no + ".png";
    this.storage.storage_info('avator_no', no);
  }

  get avator_path(): string {
    return this._avator_path;
  }
}
