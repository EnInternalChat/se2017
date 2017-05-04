import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Notice } from '../../providers/notification';
import { HTTPService } from '../../providers/http_helper';

/**
 * Generated class for the NotificationList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html',
})
export class NotificationList {


  read_status_array = ['notice_not_read', 'notice_old'];
  read_status : string = this.read_status_array[0];

  public notice_list_not_read : Array<Notice> = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public web_helper: HTTPService) {
    this.web_helper.get("assets/data/notices.json", null).then(
      (res) => {
        for (let i = 0, n = res.length; i < n; i++) {
          this.notice_list_not_read.push(new Notice(res[i]));
        }
        console.log("list: ", this.notice_list_not_read);
        // this.task_detail(this.tasks_list_not_done[0]);
      });
  }

  public notice_datail(notice : Notice) {
    return "";
  }


  swipe_event(event) {
    if(event.direction == 2) {
      // 向左滑
      if(this.read_status_array.indexOf(this.read_status) == 0) {
        this.read_status = this.read_status_array[1];
      }
    }
    else if(event.direction == 4) {
      // 向右滑
      if(this.read_status_array.indexOf(this.read_status) == 1) {
        this.read_status = this.read_status_array[0];
      }
    }
  }

}
