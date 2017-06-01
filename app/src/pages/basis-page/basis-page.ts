import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, NavParams, Events, MenuController } from 'ionic-angular';

import { AppGlobal } from '../../providers/global_data';
import { ChatService } from '../../providers/chats_service';
import { ChatList } from '../chat-list/chat-list';
import { TaskList } from '../task-list/task-list';
import { Personal } from '../personal/personal';
import { NotificationList } from '../notification-list/notification-list';

import { NativeServiceHelper } from '../../providers/native_service_helper';

/**
 * Generated class for the BasisPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-basis-page',
  templateUrl: 'basis-page.html',
})
export class BasisPage {
  @ViewChild(Nav) nav: Nav;

  // root_page: any = TaskList;
  // root_page: any = Personal;
  // root_page: any = NotificationList;
  root_page: any = ChatList;
  pages: Array<{title: string, component: Component, icon_path: string}>;

  public job : string = "管理员";

  public constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public global_data: AppGlobal,
    public chat_service: ChatService,
    public events: Events) {
    this.pages = [
      {title: "聊天管理", component: ChatList, icon_path: "assets/img/chat.png"},
      {title: "任务管理", component: TaskList, icon_path: "assets/img/task.png"},
      {title: "查看通知", component: NotificationList, icon_path: "assets/img/notification.png"},
      {title: "账户设置", component: Personal, icon_path: "assets/img/setting.png"},
    ];
  }

  public open_page(page) {
    this.nav.setRoot(page.component);
  }

  public open_notification_info() {

  }

  ionViewDidLoad() {
    // 注册全局注销事件
    this.events.subscribe('logout', 
      () => {
        this.chat_service.logout().then(
          (data) => console.log("注销成功"),
          (error) => console.log("注销失败")).then(
          () => this.navCtrl.pop());
      });
    // 注册全局切换页面事件
    this.events.subscribe('open_notice',
      (page_index) => {
        this.open_page(this.pages[page_index]);
        return true;
      });
  } 

  ionViewWillUnload() {
    this.events.unsubscribe('logout');
    this.events.unsubscribe('open_notice');
  }

}
