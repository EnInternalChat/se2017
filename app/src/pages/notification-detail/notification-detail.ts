import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';

import * as marked from 'marked';

import { API } from '../../providers/api';
import { UIText } from '../../providers/ui_text';
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
              public api: API,
              public ui: UIText) {
  }

  ionViewDidLoad() {
    this.notice = this.navParams.get('notice');
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: true,
      sanitize: true,
      smartLists: true,
      smartypants: true
    });
    this.content = marked(this.notice.content); 
  }

  public go_back() {
    this.navCtrl.pop();
  }

  public trust_HTML(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

}
