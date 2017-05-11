import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppGlobal } from '../../providers/global_data';

/**
 * Generated class for the AvatorSelector page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-avator-selector',
  templateUrl: 'avator-selector.html',
})
export class AvatorSelector {

  // public global_data: AppGlobal;
  public avator_array: Array<{value: number, content: string}> = [];
  public cur_avator: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global_data: AppGlobal) {
    for(let i = 1; i <= 4; i++) {
      this.avator_array.push({value: i, content: "男头像" + i.toString()});
    }
    for(let i = 1; i <= 4; i++) {
      this.avator_array.push({value: i+4, content: "女头像" + i.toString()});     
    }
    // this.global_data = AppGlobal.get_instance();
    this.cur_avator = this.global_data.avator_no;
  }

  public set_avator(index: number) {
    this.cur_avator = index;
  }

  go_back() {
    this.navCtrl.pop();
  }

  change_avator() {
    this.global_data.set_avator_no(this.cur_avator);
    this.navCtrl.pop();
  }

}
