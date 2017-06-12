import { Component } from '@angular/core';
import { NavController, NavParams, Events, 
         AlertController, LoadingController } from 'ionic-angular';

import { AvatorSelector } from '../avator-selector/avator-selector';
import { AppGlobal } from '../../providers/global_data';
import { StorageHelper } from '../../providers/storage_helper';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { API } from '../../providers/api';
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

  public info: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController,
              public native: NativeServiceHelper,
              public api: API,
              public global_data: AppGlobal,
              public ui: UIText,
              public storage: StorageHelper,
              public events: Events) {
    this.info['gender'] = true;
  }

  public log_out() {
    this.events.publish('logout');
  }

  public show_avator_slector() {
    this.navCtrl.push(AvatorSelector);
  }

  public show_password_prompt() {
    let password_prompt = this.alertCtrl.create(
    {
      title: this.ui.PersonalPage.change_pwd,
      cssClass: "password-alert",
      inputs: [
      {
        name: "pwd_old",
        type: "password",
        placeholder: this.ui.PersonalPage.old_pwd
      },
      {
        name: "pwd_new",
        type: "password",
        placeholder: this.ui.PersonalPage.new_pwd
      },
      {
        name: "pwd_new_check",
        type: "password",
        placeholder: this.ui.PersonalPage.check_pwd
      },
      ],
      buttons: [
      {
        text: this.ui.PersonalPage.cancel,
        role: "cancel",
      },
      {
        text: this.ui.PersonalPage.ok,
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

  public show_contact_prompt() {
    let contact_prompt = this.alertCtrl.create(
    {
      title: this.ui.PersonalPage.change_contact,
      cssClass: "password-alert",
      inputs: [
      {
        name: "tel1",
        type: "text",
        placeholder: this.ui.PersonalPage.tel
      },
      {
        name: "tel2",
        type: "text",
        placeholder: this.ui.PersonalPage.tel
      },
      {
        name: "mail1",
        type: "text",
        placeholder: this.ui.PersonalPage.mail
      },
      {
        name: "mail2",
        type: "text",
        placeholder: this.ui.PersonalPage.mail
      },
      ],
      buttons: [
      {
        text: this.ui.PersonalPage.cancel,
        role: "cancel",
      },
      {
        text: this.ui.PersonalPage.ok,
        handler: data => {
          if(data.tel1 !== '' 
            && !data.tel1.match(/^1[34578]\d{9}$/g)) 
            this.native.show_toast("电话号码1格式错误");
          else if(data.tel2 !== '' 
            && !data.tel2.match(/^1[34578]\d{9}$/g))
            this.native.show_toast("电话号码2格式错误");
          else if(data.mail1 !== '' 
            && !data.mail1.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g)) 
            this.native.show_toast("邮箱1格式错误");
          else if(data.mail2 !== '' 
            && !data.mail2.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g))
           this.native.show_toast("邮箱2格式错误");
          else {
            this.api.update_personal({}).then(
              (result) => {
                if(result)
                  contact_prompt.dismiss().then(
                    () => this.native.show_toast("修改联系方式成功"));
                else
                  this.native.show_toast("修改联系方式失败");
              })
          }
          return false;
        }
      }]
    });
    contact_prompt.present(); 
  }

  public change_password(pwd_old: string, pwd_new: string):Promise<any> {
    this.native.loading();
    return this.api.update_personal({
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
