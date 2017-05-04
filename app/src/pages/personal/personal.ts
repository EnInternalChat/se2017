import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppGlobal } from '../../providers/global_data';

/**
 * Generated class for the Personal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class Personal {

  public global_data : AppGlobal;
  public language : string;
  public language_options : Array<{value : string, text : string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.global_data = AppGlobal.get_instance();
    this.language_options = [
      {"value": "zh_cn", "text": "简体中文"},
      {"value": "en_us", "text": "English"}
    ];
    this.language = this.language_options[0].value;
  }

  log_out() {

  }

}
