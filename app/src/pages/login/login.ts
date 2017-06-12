import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BasisPage } from '../basis-page/basis-page';

import { UIText } from '../../providers/ui_text';
import { AppGlobal } from '../../providers/global_data';
import { StorageHelper } from '../../providers/storage_helper';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { API } from '../../providers/api';
import { ChatService } from '../../providers/chats_service';
import { MD5 } from '../../providers/secure_md5';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  username: string;
  private _password: string;
  remember_password: boolean;
  auto_login: boolean;

  password_is_md5: boolean;

  set password(value: string) {
    this.password_is_md5 = false;
    this._password = value;
  }

  get password() {
    return this._password;
  }

  constructor(private native: NativeServiceHelper,
              private api: API,
              private nav_ctrl: NavController,
              private global_data: AppGlobal,
              private storage: StorageHelper,
              private md5_helper: MD5,
              public ui: UIText,
              public chat_service: ChatService) {
  }

  ionViewDidEnter() {
    this.storage.read_local_info("remember_password", true).then((value) => {
      return this.remember_password = value;
    }).then((value) => {
      if(value){
        this.storage.read_local_info("password", "").then((value) => {
          this.password = value;
          this.password_is_md5 = true;
          if(this.password == "")
            this.password_is_md5 = false;
          else
            this.password_is_md5 = true;
        });
      }
      this.username = this.global_data.user_name;        
    });
    this.storage.read_local_info("auto_login", false).then((value) => {
      this.auto_login = value;
      if(this.auto_login)
        this.on_login();
    });
  }

  print_value() {
    console.log("remember_pass: " + this.remember_password);
    console.log("auto_login: " + this.auto_login);
    console.log("username: " + this.username);
    console.log("password: " + this.password);
  }

  on_login() {
    if(this.username == "" || this.password == "") {
      this.native.show_toast("用户名和密码不能为空", 2000, "bottom");
      return;  
    }
    let password_md5;
    if(!this.password_is_md5) {
      password_md5 = this.global_data.encrypt_pwd(this.password);
      this.password_is_md5 = true;
    }
    else
      password_md5 = this.password;
    console.log("md5: ", password_md5);
    this.native.loading();
    this.api.login(this.username, password_md5).then(
      (data) => {
        if(this.remember_password || this.auto_login) {
          this.storage.storage_info("username", this.username);
          this.storage.storage_info("password", password_md5);
        }
        this.global_data.user_name = this.username;
        // this.native.stop_loading();
        // this.nav_ctrl.push(BasisPage);
        return true;
      },
      (error) => {
        if(this.remember_password) {
          this.storage.storage_info("username", this.username);
          this.storage.storage_info("password", password_md5);
        }
        this.global_data.user_name = this.username;
        if(this.username === 'testuser')
          this.global_data.set_avator_no(3);
        else if(this.username === 'testuser2')
          this.global_data.set_avator_no(6);
        else if(this.username === 'testuser3')
          this.global_data.set_avator_no(2);
        else
          this.global_data.set_avator_no(1);
        // this.native.stop_loading();
        // this.native.show_toast("请检查网络");
        // this.nav_ctrl.push(BasisPage);
        return true;
      })
      .then(
      (data) => {
          this.chat_service.login(this.username, '123456').then(
            (data) => {
              this.native.stop_loading();
              this.native.show_toast("登录成功");
              this.nav_ctrl.push(BasisPage);                
            },
            (error) => console.log("登录失败"));
        });
  }

  remember_password_change() {
    this.storage.storage_info('remember_password', this.remember_password);
  }

  auto_login_change() {    
    this.storage.storage_info('auto_login', this.auto_login);
  }

}
