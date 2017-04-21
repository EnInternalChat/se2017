import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

import { AppGlobal } from '../../providers/global_data';
import { StorageHelper } from '../../providers/storage_helper';


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

  // username与password为可选类型，可以不包含
  username: string ;
  password: string;
  remember_password: boolean;
  auto_login: boolean;

  constructor() {
    this.storage.read_local_info("remember_password", true).then((value) => {
      return this.remember_password = value;
    }).then((value) => {
      if(value){
        this.storage.read_secure_local_info("password", "1q").then((value) => {
          this.password = value;
        });
        this.username = this.global_data.user_name;        
      }
    });
    this.storage.read_local_info("auto_login", false).then((value) => {
      this.auto_login = value;
    });
    // if(this.remember_password) {
    //   this.password = this.storage.read_secure_local_info('passowrd', '');
    // }
  }

  print_value() {
    console.log("remember_pass: " + this.remember_password);
    console.log("auto_login: " + this.auto_login);
    console.log("username: " + this.username);
    console.log("password: " + this.password);
  }

  on_login() {
    this.remember_password = true;
    this.auto_login = true;
    this.username = "test";
    this.password = "test1";

    // this.set_avator();
    // AppGlobal.get_instance().user_name = this.username;
  }

  remember_password_change() {
    // this.storage.storage_info('remember_password', this.login.remember_password);
    // if(this.login.remember_password) {
    //   this.storage.storage_secure_info('password', this.login.password);
    // }
    // else {
    //   this.storage.remove_secure_info('password');
    // }
    // console.log("remember_pass: " + this.login.remember_password);
    // console.log("auto_login: " + this.login.auto_login);
  }

  auto_login_change() {    
    // this.storage.storage_info('auto_login', this.login.auto_login);
    // console.log("remember_pass: " + this.login.remember_password);
    // console.log("auto_login: " + this.login.auto_login);
  }

}
