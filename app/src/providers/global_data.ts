import { Injectable } from '@angular/core';
import { StorageHelper } from './storage_helper';
import { MD5 } from './secure_md5';

export const enum AppLanguage {
  CN = 1,
  EN = 2
}

@Injectable()
// storage some useful value 
export class AppGlobal {

  private _user_name: string;
  private _avator_path: string;
  private _avator_no: number;

  public job : string = "管理员";

  public is_debug: boolean = true;
  public server_url: string = this.is_debug ? "" : "http://123.206.121.176:8888/EnInternalChat";
  public language: AppLanguage = AppLanguage.CN;

  public constructor(
    private storage: StorageHelper,
    private md5_helper: MD5) 
  {
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
      this._avator_no = value;
      return this._avator_path = "assets/img/avator/" + value + ".png";
    });
  }

  public encrypt_pwd(password: string): string {
    return this.md5_helper.hex_md5(password);
  }

  set user_name(username: string) {
    this._user_name = username;
    this.storage.storage_info('username', username);
  }
  get user_name(): string {
    return this._user_name;
  }

  public set_avator_no(no: number) {
    this._avator_no = no;
    this._avator_path = "assets/img/avator/" + no + ".png";
    this.storage.storage_info('avator_no', no);
  }

  get avator_path(): string {
    return this._avator_path;
  }

  get avator_no(): number {
    return this._avator_no;
  }
}
