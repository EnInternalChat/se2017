import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HTTPService } from '../../providers/http_helper';
import { NativeServiceHelper } from '../../providers/native_service_helper';

/**
 * Generated class for the NewSingleChat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-single-chat',
  templateUrl: 'new-single-chat.html',
})
export class NewSingleChat {

  public employee_list: any = [1, 2, 3, 4, 5, 6, 1];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HTTPService,
    public native: NativeServiceHelper) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewSingleChat');
  }

  public go_back() {
    this.navCtrl.pop();
  } 

  public new_chat() {

  }

}
