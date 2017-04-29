import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams } from 'ionic-angular';
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
  templateUrl: 'basis-page.html',
})
export class BasisPage {
  @ViewChild(Nav) nav: Nav;

  root_page: any = TaskList;

  pages: Array<{title: string, component: any}>; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      {title: "task_list", component: TaskList},
      {title: "personal", component: Personal},
      {title: "notification_list", component: NotificationList}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasisPage');
  }

  open_page(page) {
    this.nav.setRoot(page.component);
  }

}
