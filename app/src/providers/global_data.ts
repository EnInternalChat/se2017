import { Injectable } from '@angular/core';
import { StorageHelper } from './storage_helper';
import { MD5 } from './secure_md5';
import { UIText, AppLanguage } from './ui_text';
import { Conversation } from './chat';


@Injectable()
// storage some useful value 
export class AppGlobal {

  private _user_name: string;
  private _avator_path: string;
  private _avator_no: number;
  private _language: AppLanguage;

  public job : string = "管理员";
  public token: string;

  public conversation_list: Array<Conversation> = [];

  public constructor(
    private storage: StorageHelper,
    private md5_helper: MD5,
    private ui: UIText) {
    let p1 = this.storage.read_local_info("username", "ZhangSan").then(
      (value) => {
        return this._user_name = value;
      });
    let p2 = this.storage.read_local_info("avator_no", 3).then(
      (value) => {
        this._avator_no = value;
        return this._avator_path = "assets/img/avator/" + value + ".png";
      });
    let p3 = this.storage.read_local_info("language", 1).then(
      (value) => this.language = <AppLanguage>value);
    Promise.all([p1, p2, p3]).then(() => {
      console.log("In Global(avator): ", this._avator_path);
      console.log("In Global(username): ", this._user_name);
      console.log("In Global(language): ", this.language);
    });
  }

  set language(lan: AppLanguage) {
    this._language = <AppLanguage>lan;
    this.storage.storage_info("language", this._language);
    this.ui.update_language(this._language);
  }

  get language(): AppLanguage {
    return this._language;
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
