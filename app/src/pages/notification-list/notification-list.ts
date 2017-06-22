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

  status_array = ['notice_not_read', 'notice_old'];
  read_status : string = this.status_array[0];

  public notice_list_not_read : Array<Notice> = [];
  public notice_list_read : Array<Notice> = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public api: API,
              public ui: UIText,
              public native: NativeServiceHelper) {
  }

  ionViewDidLoad() {
    if(!this.navParams.get('need_load'))
      return;
    this.native.loading();
    this.update_notice_list(true).then(
      () => this.native.stop_loading());
  }

  public update_notice_list(update_all: boolean){
    let p_unread = this.api.get_notice(true).then(
      (res) => {
        res = JSON.parse(res);
        res.forEach((item) => {
          this.notice_list_not_read.push(new Notice(item));
        });
      });
    let p_read = this.api.get_notice(false).then(
      (res) => {
        res = JSON.parse(res);
        res.forEach((item) => {
          this.notice_list_read.push(new Notice(item));
        });
      })
    if(update_all) {
      return Promise.all([p_read, p_unread]).catch(
        () => this.native.show_toast("网络连接失败"));
    }
    else if(this.read_status === this.status_array[0]) {
      return Promise.all([p_unread]).catch(
        () => this.native.show_toast("网络连接失败"));
    }
    else {
      return Promise.all([p_read]).catch(
        () => this.native.show_toast("网络连接失败"));
    }
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
        this.update_notice_list(false);        
      }).catch(
      () => this.native.show_toast("网络连接失败"));
    this.navCtrl.push(NotificationDetail, { notice: notice });
  }

  public doRefresh(refresher) {
    this.update_notice_list(false).then(
      () => refresher.complete());
  }

  public swipe_event(event) {
    if(event.direction == 2) {
      // 向左滑
      if(this.status_array.indexOf(this.read_status) == 0) {
        this.read_status = this.status_array[1];
      }
    }
    else if(event.direction == 4) {
      // 向右滑
      if(this.status_array.indexOf(this.read_status) == 1) {
        this.read_status = this.status_array[0];
      }
    }
  }

}
