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

  private _name_ = "Personal";

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
  }

  public ionViewDidLoad() {
    this.native.loading();
    this.api.get_personal_info(this._name_).then((res) => {
      this.global_data.set_avator_no(res['avatar']);
      this.global_data.section_id = res['sectionID'];
      this.global_data.job = (res.leader ? '部长' : '部员');
      this.info = res;
      this.native.stop_loading();
    })
  }

  public log_out() {
    this.events.publish('logout');
  }

  public show_avator_slector() {
    this.navCtrl.push(AvatorSelector, {info: this.info});
  }

  public show_password_prompt() {
    let password_prompt = this.alertCtrl.create(
    {
      title: this.ui.PersonalPage.change_pwd,
      cssClass: "form-alert",
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
        text: this.ui.cancel,
        role: "cancel",
      },
      {
        text: this.ui.ok,
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
      cssClass: "form-alert alert-large",
      inputs: [
      {
        name: "tel1",
        type: "text",
        value: this.info.phone[0],
        placeholder: this.ui.PersonalPage.tel
      },
      {
        name: "tel2",
        type: "text",
        value: this.info.phone[1],
        placeholder: this.ui.PersonalPage.tel
      },
      {
        name: "mail1",
        type: "text",
        value: this.info.email[0],
        placeholder: this.ui.PersonalPage.mail
      },
      {
        name: "mail2",
        type: "text",
        value: this.info.email[1],
        placeholder: this.ui.PersonalPage.mail
      },
      ],
      buttons: [
      {
        text: this.ui.cancel,
        role: "cancel",
      },
      {
        text: this.ui.ok,
        handler: data => {
          if(data.tel1 !== '' 
            && !data.tel1.match(/^((0\d{2,3}-\d{8,9})|(1[3584]\d{9}))$/g)) 
            this.native.show_toast("电话号码1格式错误");
          else if(data.tel2 !== '' 
            && !data.tel2.match(/^((0\d{2,3}-\d{8,9})|(1[3584]\d{9}))$/g))
            this.native.show_toast("电话号码2格式错误");
          else if(data.mail1 !== '' 
            && !data.mail1.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g)) 
            this.native.show_toast("邮箱1格式错误");
          else if(data.mail2 !== '' 
            && !data.mail2.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g))
           this.native.show_toast("邮箱2格式错误");
          else {
            this.native.loading();
            this.api.update_personal({
              "email1": data.mail1,
              "email2": data.mail2,
              "phone1": data.tel1,
              "phone2": data.tel2
            }).then(
              (result) => {
                if(result) {
                  this.info.phone = [data.tel1, data.tel2];
                  this.info.email = [data.mail1, data.mail2];
                  this.api.clean_cache(this._name_).then(() => {
                    this.native.stop_loading();
                    contact_prompt.dismiss().then(
                      () => this.native.show_toast("修改联系方式成功"));                    
                  })
                }
                else {
                  this.native.stop_loading();
                  this.native.show_toast("修改联系方式失败");
                }
              })
          }
          return false;
        }
      }]
    });
    contact_prompt.present(); 
  }

  public change_password(pwd_old: string, pwd_new: string):Promise<any> {
    if(this.global_data.encrypt_pwd(pwd_old) !== this.global_data.password) {
      return Promise.resolve(false);
    }
    this.native.loading();
    return this.api.update_personal({
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

  public doRefresh(refresher) {
    this.api.clean_cache(this._name_).then(() => {
      this.api.get_personal_info(this._name_).then((res) => {
        this.global_data.set_avator_no(res['avatar']);
        this.global_data.section_id = res['sectionID'];
        this.global_data.job = (res.leader ? '部长' : '部员');
        this.info = res;
        refresher.complete();
      })
    })
    setTimeout(() => refresher.complete(), 5000);
  }

}
