import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams, Events } from 'ionic-angular';

import { AppGlobal } from '../../providers/global_data';
import { ChatList } from '../chat-list/chat-list';
import { TaskList } from '../task-list/task-list';
import { Personal } from '../personal/personal';
import { NotificationList } from '../notification-list/notification-list';

/**
 * Generated class for the BasisPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-basis-page',
  templateUrl: 'basis-page.html',
})
export class BasisPage {
  @ViewChild(Nav) nav: Nav;

  // root_page: any = TaskList;
  // root_page: any = Personal;
  root_page: any = NotificationList;
  pages: Array<{title: string, component: any, icon_path: string}>;

  public job : string = "管理员";

  public constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global_data: AppGlobal,
    public events: Events) {
    this.pages = [
      {title: "聊天管理", component: ChatList, icon_path: "assets/img/chat.png"},
      {title: "任务管理", component: TaskList, icon_path: "assets/img/task.png"},
      {title: "查看通知", component: NotificationList, icon_path: "assets/img/notification.png"},
      {title: "账户设置", component: Personal, icon_path: "assets/img/setting.png"},
    ];
    // this.global_data = AppGlobal.get_instance();
  }

  public open_page(page) {
    this.nav.setRoot(page.component);
  }

  ionViewDidLoad() {
    this.events.subscribe('logout', 
      () => this.navCtrl.pop());
  } 

  ionViewWillUnload() {
    this.events.unsubscribe('logout');
  }

}
