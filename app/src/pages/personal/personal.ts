import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
         AlertController, LoadingController } from 'ionic-angular';

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

  public global_data : AppGlobal;
  public language : string;
  public language_options : Array<{value : string, text : string}>;
  public storage_helper: StorageHelper;
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController,
              public nativeService: NativeServiceHelper,
              public web_helper: HTTPService,
              public navParams: NavParams) {
    this.global_data = AppGlobal.get_instance();
    this.language_options = [
      {"value": "zh_cn", "text": "简体中文"},
      {"value": "en_us", "text": "English"}
    ];
    this.language = this.language_options[0].value;
    this.storage_helper = StorageHelper.get_instance();
  }

  log_out() {

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
            this.nativeService.show_toast("两次新密码不一致", 3000, "bottom");
          else if (!this.change_password(data.pwd_old, data.pwd_new))
            this.nativeService.show_toast("修改密码失败", 3000, "bottom");
          else
            return true;
          return false;
        }
      }]
    });
    password_prompt.present();
    
  }

  change_password(pwd_old: string, pwd_new: string):boolean {
    let loading = this.loadCtrl.create({"content": "请稍候..."});
    loading.present();
    this.web_helper.post("/personal/update", {
      "oldPwd": this.global_data.encrypt_pwd(pwd_old),
      "newPwd": this.global_data.encrypt_pwd(pwd_new)
    }).then(
    (data) => {
      console.log("Response: ", data);
      loading.dismiss();
      return true;
    },
    (error) => {
      console.log(error);
      loading.dismiss();
      return false;
    });
    return false;
  }
}
