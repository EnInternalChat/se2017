import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HTTPService } from '../../providers/http_helper';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { AppGlobal } from '../../providers/global_data';
import { ChatDetail } from '../chat-detail/chat-detail';
import { Conversation } from '../../providers/chat';

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

  public employee_list: any = [];
  public select_person: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HTTPService,
    public native: NativeServiceHelper,
    public global_data: AppGlobal) {
  }

  ionViewDidLoad() {
    this.employee_list.push({ id: 'admin', no: 1 });
    this.employee_list.push({ id: 'testuser3', no: 2 });
    this.employee_list.push({ id: 'testuser2', no: 6 });
    this.employee_list.push({ id: 'testuser', no: 3 });
    for(let i = 0, n = this.employee_list.length; i < n; i++) {
      if(this.employee_list[i].id == this.global_data.user_name) {
        this.employee_list.splice(i, 1);
        break;
      }
    }
  }

  public go_back() {
    this.navCtrl.pop();
  } 

  public new_chat() {
    if(this.select_person == null)
      return;
    let in_list = false;
    this.global_data.conversation_list.forEach((item) => {
      if(item.is_single && item.target_id === this.select_person) {
        this.navCtrl.push(ChatDetail, {conversation: item});
        return;
      }
    })
    let new_con = new Conversation({
      
    });
    this.navCtrl.push(ChatDetail, {conversation:})
  }

}
