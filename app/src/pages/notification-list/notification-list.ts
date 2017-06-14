import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NotificationDetail } from '../notification-detail/notification-detail';
import { Notice } from '../../providers/notification';
import { API } from '../../providers/api';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { UIText } from '../../providers/ui_text';

/**
 * Generated class for the NotificationList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html',
})
export class NotificationList {

  read_status_array = ['notice_not_read', 'notice_old'];
  read_status : string = this.read_status_array[0];

  public notice_list_not_read : Array<Notice> = [];
  public notice_list_read : Array<Notice> = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public api: API,
              public ui: UIText,
              public native: NativeServiceHelper) {
  }

  ionViewDidLoad() {
    this.notice_list_read = [];
    this.notice_list_not_read = [];
    this.native.loading();
    this.update_notice_list().then(
      () => this.native.stop_loading());
  }

  public update_notice_list(){
    return this.api.get_notice().then(
      (res) => {
        let new_notice: Notice;
        for (let i = 0, n = res.length; i < n; i++) {
          new_notice = new Notice(res[i]);
          if(new_notice.is_read)
            this.notice_list_read.push(new_notice);
          else
            this.notice_list_not_read.push(new_notice);
        }
      }).catch(
      () => this.native.show_toast("网络连接失败"));
  }

  public track_by_id(index: number, notice: Notice) {
    return notice.id;
  }

  public read_notice(notice : Notice) {
    if(notice.is_read) {
      this.navCtrl.push(NotificationDetail, { notice: notice });
      return;
    }
    this.api.read_notice(notice.id).then(
      (res) => {
        this.update_notice_list();        
      }).catch(
      () => this.native.show_toast("网络连接失败"));
    this.navCtrl.push(NotificationDetail, { notice: notice });
  }

  public doRefresh(refresher) {
    this.notice_list_read = [];
    this.notice_list_not_read = [];
    this.update_notice_list().then(
      () => refresher.complete());
  }

  public swipe_event(event) {
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
