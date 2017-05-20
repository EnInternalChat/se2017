import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { BasisPage } from '../basis-page/basis-page';

import { AppGlobal } from '../../providers/global_data';
import { StorageHelper } from '../../providers/storage_helper';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { HTTPService } from '../../providers/http_helper';
import { ChatService } from '../../providers/chats_service';
import { MD5 } from '../../providers/secure_md5';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  username: string;
  password: string;
  remember_password: boolean;
  auto_login: boolean;

  password_is_md5: boolean;

  constructor(private native: NativeServiceHelper,
              private web_helper: HTTPService,
              private nav_ctrl: NavController,
              private global_data: AppGlobal,
              private storage: StorageHelper,
              private md5_helper: MD5,
              public chat_service: ChatService) {
  }

  ionViewDidEnter() {
    this.storage.read_local_info("remember_password", true).then((value) => {
      return this.remember_password = value;
    }).then((value) => {
      if(value){
        this.storage.read_local_info("password", "").then((value) => {
          this.password = value;
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

  password_change() {
    this.password_is_md5 = false;
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
    this.native.loading("登录中...");
    this.web_helper.post(
      '/login.do', {"name": this.username, "pwd": password_md5}).then(
      (data) => {
        console.log("Response: ", data);
        if(this.remember_password || this.auto_login) {
          this.storage.storage_info("username", this.username);
          this.storage.storage_info("password", password_md5);
        }
        // this.native.stop_loading();
        // this.nav_ctrl.push(BasisPage);
        return true;
      },
      (error) => {
        if(this.remember_password) {
          this.storage.storage_info("username", this.username);
          this.storage.storage_info("password", password_md5);
        }
        // this.native.stop_loading();
        this.native.show_toast("请检查网络");
        // this.nav_ctrl.push(BasisPage);
        return true;
      }).then(
      (data) => {
          return this.chat_service.login(this.username, this.password).then(
            (data) => console.log("登录成功"),
            (error) => console.log("登录失败"));
        }).then(
        () => {
          this.native.stop_loading();
          this.nav_ctrl.push(BasisPage);
        });
  }

  remember_password_change() {
    this.storage.storage_info('remember_password', this.remember_password);
  }

  auto_login_change() {    
    this.storage.storage_info('auto_login', this.auto_login);
  }

}
