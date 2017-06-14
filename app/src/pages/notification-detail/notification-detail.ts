import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';

import { markdown } from 'markdown';

import { API } from '../../providers/api';
import { Notice } from '../../providers/notification';

/**
 * Generated class for the NotificationDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html',
})
export class NotificationDetail {

  public notice: any = {};
  public content: any;
  constructor(private sanitizer: DomSanitizer,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public api: API) {
  }

  ionViewDidLoad() {
    this.notice = this.navParams.get('notice');
    this.content = markdown.toHTML(this.notice.content); 
  }

  public go_back() {
    this.navCtrl.pop();
  }

  public trust_HTML(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

}
