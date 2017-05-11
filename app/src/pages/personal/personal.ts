import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, 
         AlertController, LoadingController } from 'ionic-angular';

import { AvatorSelector } from '../avator-selector/avator-selector';
import { AppGlobal } from '../../providers/global_data';
import { StorageHelper } from '../../providers/storage_helper';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { HTTPService } from '../../providers/http_helper';

/**
 * Generated class for the Personal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class Personal {

  public language : string;
  public language_options : Array<{value : string, text : string}>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController,
              public native: NativeServiceHelper,
              public web_helper: HTTPService,
              public global_data: AppGlobal,
              public storage: StorageHelper,
              public events: Events) {
    this.language_options = [
      {"value": "zh_cn", "text": "简体中文"},
      {"value": "en_us", "text": "English"},
    ];
    this.language = this.language_options[0].value;
  }

  log_out() {
    console.log(this.navCtrl);
    console.log(this.navCtrl.length());
    this.events.publish('logout');
  }

  show_avator_slector() {
    this.navCtrl.push(AvatorSelector);
  }

  show_password_prompt() {
    let password_prompt = this.alertCtrl.create(
    {
      title: "修改密码",
      cssClass: "password-alert",
      inputs: [
      {
        name: "pwd_old",
        type: "password",
        placeholder: "旧密码"
      },
      {
        name: "pwd_new",
        type: "password",
        placeholder: "新密码"
      },
      {
        name: "pwd_new_check",
        type: "password",
        placeholder: "确认密码"
      },
      ],
      buttons: [
      {
        text: "取消",
        role: "cancel",
      },
      {
        text: "确认",
        handler: data => {
          if(data.pwd_new != data.pwd_new_check)
            this.native.show_toast("两次新密码不一致");
          else if (!this.change_password(data.pwd_old, data.pwd_new))
            this.native.show_toast("修改密码失败");
          else
            return true;
          return false;
        }
      }]
    });
    password_prompt.present(); 
  }

  change_password(pwd_old: string, pwd_new: string):boolean {
    this.native.loading("请稍候...");
    this.web_helper.post("/personal/update", {
      "oldPwd": this.global_data.encrypt_pwd(pwd_old),
      "newPwd": this.global_data.encrypt_pwd(pwd_new)
    }).then(
    (data) => {
      console.log("Response: ", data);
      this.native.stop_loading();
      return true;
    },
    (error) => {
      console.log(error);
      this.native.stop_loading();
      return false;
    });
    return false;
  }
}
