import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { BasisPage } from '../basis-page/basis-page';

import { AppGlobal } from '../../providers/global_data';
import { StorageHelper } from '../../providers/storage_helper';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { HTTPService } from '../../providers/http_helper';
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
  global_data: AppGlobal = AppGlobal.get_instance();
  private storage: StorageHelper = StorageHelper.get_instance();

  username: string;
  password: string;
  remember_password: boolean;
  auto_login: boolean;

  password_is_md5: boolean;
  md5_helper: MD5;

  constructor(private native_helper: NativeServiceHelper,
              private web_helper: HTTPService,
              private nav_ctrl: NavController) 
  {
    this.storage.read_local_info("remember_password", true).then((value) => {
      return this.remember_password = value;
    }).then((value) => {
      if(value){
        this.storage.read_secure_local_info("password", "").then((value) => {
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
    });
    this.md5_helper = new MD5();
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
      this.native_helper.show_toast("用户名和密码不能为空", 2000, "bottom");
      return;  
    }
    let password_md5;
    if(!this.password_is_md5) {
      password_md5 = this.md5_helper.hex_md5(this.password);
      this.password_is_md5 = true;
    }
    else
      password_md5 = this.password;
    // this.web_helper.post(
    //   '/login', {"username": this.username, "password": password_md5}).then(
    //   (data) => {
    //     if(this.remember_password || this.auto_login) {
    //       this.storage.storage_info("username", this.username);
    //       this.storage.storage_secure_info("password", password_md5);
    //     }
    //   });
      this.nav_ctrl.push(BasisPage);
  }

  remember_password_change() {
    this.storage.storage_info('remember_password', this.remember_password);
  }

  auto_login_change() {    
    this.storage.storage_info('auto_login', this.auto_login);
  }

}
