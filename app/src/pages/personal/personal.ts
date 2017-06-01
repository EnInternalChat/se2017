import { Component } from '@angular/core';
import { NavController, NavParams, Events, 
         AlertController, LoadingController } from 'ionic-angular';

import { AvatorSelector } from '../avator-selector/avator-selector';
import { AppGlobal } from '../../providers/global_data';
import { StorageHelper } from '../../providers/storage_helper';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { HTTPService } from '../../providers/http_helper';
import { UIText, AppLanguage } from '../../providers/ui_text';

/**
 * Generated class for the Personal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class Personal {

  public language_options : Array<{value : AppLanguage, text : string}>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController,
              public native: NativeServiceHelper,
              public web_helper: HTTPService,
              public global_data: AppGlobal,
              public ui: UIText,
              public storage: StorageHelper,
              public events: Events) {
    this.language_options = [
      {"value": AppLanguage.CN, "text": "简体中文"},
      {"value": AppLanguage.EN, "text": "English"},
    ];
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
          if(data.pwd_old === '') 
            this.native.show_toast("旧密码不能为空");
          else if(data.pwd_new === '' || data.pwd_new_check === '')
            this.native.show_toast("新密码不能为空");
          else if(data.pwd_new != data.pwd_new_check) 
            this.native.show_toast("两次新密码不一致");
          else {
            this.change_password(data.pwd_old, data.pwd_new).then(
              (result) => {
                if(result)
                  password_prompt.dismiss().then(
                    () => this.native.show_toast("修改密码成功"));
                else
                  this.native.show_toast("修改密码失败");
              });
          }
          return false;
        }
      }]
    });
    password_prompt.present(); 
  }

  change_password(pwd_old: string, pwd_new: string):Promise<any> {
    this.native.loading();
    return this.web_helper.post("/personal/update", {
      "oldPwd": this.global_data.encrypt_pwd(pwd_old),
      "newPwd": this.global_data.encrypt_pwd(pwd_new)
    }).then(
    (data) => {
      this.native.stop_loading();
      return true;
    },
    (error) => {
      this.native.stop_loading();
      return false;
    });
  }

}
