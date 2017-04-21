import { StorageHelper } from './storage_helper';
// import { Storage } from '@ionic/storage';

export const enum AppLanguage {
  CN = 1,
  EN = 2
}

// export interface Storage_data_t {
//   [index: string] : any;
// }

// storage some useful value 
export class AppGlobal {
  private static instance: AppGlobal;

  private _user_name: string;
  private _avator_no: number;

  private storage: StorageHelper = StorageHelper.get_instance();

  // private m_storage_value: Storage_data_t = {"username": this._user_name, "avator_no": this._avator_no};
  // private m_default_data: Storage_data_t = {"username": "username@outlook.com", "avator_no": 1};

  public is_debug: boolean = true;
  public server_url: string = this.is_debug ? "http://" : "http://";
  public language: AppLanguage = AppLanguage.CN;

  private constructor() 
  {
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
    return this.storage.read_local_info("avator_no", 1).then((value) => 
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
