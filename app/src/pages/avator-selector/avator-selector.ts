import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppGlobal } from '../../providers/global_data';
import { UIText } from '../../providers/ui_text';
import { API } from '../../providers/api';
import { NativeServiceHelper } from '../../providers/native_service_helper';

/**
 * Generated class for the AvatorSelector page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-avator-selector',
  templateUrl: 'avator-selector.html',
})
export class AvatorSelector {

  public avator_array: Array<{value: number, content: string}> = [];
  public cur_avator: number;
  public info: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global_data: AppGlobal,
    public ui: UIText,
    public api: API,
    public native: NativeServiceHelper) {
  }

  ionViewDidLoad() {
    for(let i = 1; i <= 4; i++) {
      this.avator_array.push({value: i, content: "男头像" + i.toString()});
    }
    for(let i = 1; i <= 4; i++) {
      this.avator_array.push({value: i+4, content: "女头像" + i.toString()});
    }
    this.cur_avator = this.global_data.avator_no;
    this.info = this.navParams.get('info');    
  }

  public set_avator(index: number) {
    this.cur_avator = index;
  }

  go_back() {
    this.navCtrl.pop();
  }

  change_avator() {
    this.native.loading();
    this.global_data.set_avator_no(this.cur_avator);
    this.api.update_personal({
      avatar: this.cur_avator,
      "email1": this.info.email[0],
      "email2": this.info.email[1],
      "phone1": this.info.phone[0],
      "phone2": this.info.phone[1]
    }).then((res) => {
      this.api.clean_cache("Personal").then(() => {
        this.native.stop_loading();
        this.navCtrl.pop();              
      })
    })
  }

}
