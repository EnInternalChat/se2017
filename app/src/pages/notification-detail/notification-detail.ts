import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { markdown } from 'markdown';

import { Notice } from '../../providers/notification';

/**
 * Generated class for the NotificationDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html',
})
export class NotificationDetail {

  public notice: Notice;
  public content: any;
  constructor(private sanitizer: DomSanitizer,
              public navCtrl: NavController, 
              public navParams: NavParams) {
    this.notice = navParams.data.notice;
    this.content = markdown.toHTML(this.notice.content);
  }

  public go_back() {
    this.navCtrl.pop();
  }

  public trust_HTML(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

}
