import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, NavParams, Events, MenuController } from 'ionic-angular';

import { AppGlobal } from '../../providers/global_data';
import { ChatService } from '../../providers/chats_service';
import { ChatList } from '../chat-list/chat-list';
import { TaskList } from '../task-list/task-list';
import { Personal } from '../personal/personal';
import { NotificationList } from '../notification-list/notification-list';
import { UIText } from '../../providers/ui_text';
import { API } from '../../providers/api';


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
  pages: Array<{
    title: string, component: Component, icon_path: string, has_load: boolean}>;

  public job : string = "管理员";

  public constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public global_data: AppGlobal,
    public chat_service: ChatService,
    public api: API,
    public events: Events,
    public ui: UIText) {
    this.pages = [
      {title: this.ui.BasisPage.chat, component: ChatList, 
        icon_path: "assets/img/chat.png", has_load: false},
      {title: this.ui.BasisPage.task, component: TaskList, 
        icon_path: "assets/img/task.png", has_load: false},
      {title: this.ui.BasisPage.notice, component: NotificationList, 
        icon_path: "assets/img/notification.png", has_load: false},
      {title: this.ui.BasisPage.personal, component: Personal, 
        icon_path: "assets/img/setting.png", has_load: false},
    ];
  }

  public open_page(page) {
    if(page.has_load) {
      this.nav.setRoot(page.component, { need_load: false });
    }
    else {
      page.has_load = true;
      this.nav.setRoot(page.component, { need_load: true });
    }

  }

  public open_notification_info() {

  }

  ionViewDidLoad() {
    // 注册全局注销事件
    this.events.subscribe('logout', 
      () => {
        let p1 = this.chat_service.logout().then(
          (data) => console.log("注销成功"),
          (error) => console.log("注销失败"));
        Promise.all([p1, this.api.logout()]).then(
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
