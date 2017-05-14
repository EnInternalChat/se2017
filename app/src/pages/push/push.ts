import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare let window;

/**
 * Generated class for the Push page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-push',
  templateUrl: 'push.html',
})
export class Push {

  alias: string = "";
  msgList: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initJPush();
  }

  initJPush() {
    //启动极光推送
    if (window.plugins && 　window.plugins.jPushPlugin) {
      window.plugins.jPushPlugin.init();
      document.addEventListener("jpush.receiveNotification", () => {
        console.log(window.plugins.jPushPlugin.receiveNotification);
        this.msgList.push({content:window.plugins.jPushPlugin.receiveNotification.alert})
      }, false);
    }
  }

  setAlias() {
    //设置Alias
    if (this.alias && this.alias.trim() != '') {
      window.plugins.jPushPlugin.setAlias(this.alias);
    }else alert('Alias不能为空')
  }

}
