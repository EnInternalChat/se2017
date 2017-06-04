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
  public select_person: any = null;

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

  public update_select(item) {
    this.select_person = item;
  }

  public go_back() {
    this.navCtrl.pop();
  } 

  public new_chat() {
    if(this.select_person == null)
      return;
    let con_list = this.global_data.conversation_list;

    for(let i = 0, n = con_list.length; i < n; i++) {
      if(con_list[i].is_single 
        && con_list[i].target_id === this.select_person.id) {
        this.navCtrl.push(ChatDetail, {conversation: con_list[i]});
        return;
      }
    }

    let new_con = new Conversation({
      type: 'single',
      targetInfo: {
        nickname: this.select_person.no,
        userName: this.select_person.id,
        userID: this.select_person.id
      },
      latestType: 'text',
      unReadMsgCnt: 0,
      lastMsgDate: new Date().toString()
    });
    new_con.last_text = "";
    this.navCtrl.push(ChatDetail, {conversation: new_con});
  }

}
