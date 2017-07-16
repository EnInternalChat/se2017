import { Injectable } from '@angular/core';
import { StorageHelper } from './storage_helper';
import { MD5 } from './secure_md5';
import { Base64 } from './base64';
import { UIText, AppLanguage } from './ui_text';
import { Conversation } from './chat';


@Injectable()
// storage some useful value 
export class AppGlobal {

  private _user_name: string;
  private _avator_path: string;
  private _avator_no: number;
  private _language: AppLanguage;
  private _app_key: string = "f784911007eb5e69ef4a773f";
  private _master_secret: string = "d4c4f6da868458e48f4de0e8";

  public job : string = "管理员";
  public user_id: string;
  public company_id: string;
  public section_id: string;
  public password: string;
  public token: string;
  
  public conversation_list: Array<Conversation> = [];
  
  public constructor(
    private storage: StorageHelper,
    private md5_helper: MD5,
    private base64: Base64,
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
      // console.log("In Global(avator): ", this._avator_path);
      // console.log("In Global(username): ", this._user_name);
      // console.log("In Global(language): ", this.language);
    });
  }

  get auth_payload() {
    let time = new Date().getTime().toString();
    return {
      "appkey": this._app_key,
      "random_str": "022cd9fd995849b58b3ef0e943421ed9",
      "timestamp": time,
      "signature": this.encrypt_pwd("appkey=" + this._app_key + "&timestamp=" 
        + time + "&random_str=022cd9fd995849b58b3ef0e943421ed9&key=" + 
        this._master_secret)
    }
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

  public clear_remember_data() {
    return this.storage.clear();
  }
}
