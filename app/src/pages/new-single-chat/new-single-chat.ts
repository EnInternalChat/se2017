import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { API } from '../../providers/api';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { AppGlobal } from '../../providers/global_data';
import { ChatDetail } from '../chat-detail/chat-detail';
import { Conversation } from '../../providers/chat';
import { ChatService } from '../../providers/chats_service';

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

  public employee_list: Array<{id: string, no: number}> = [];
  public select_person: any = null;

  public currentPage: number = 0;
  public limit: number = 8;
  public hasNextPage = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: API,
    public chat: ChatService,
    public native: NativeServiceHelper,
    public global_data: AppGlobal) {
  }

  ionViewDidLoad() {
    this.get_employee_list(this.navParams.get('group_id'));
    // this.employee_list.push({ id: 'admin', no: 1 });
    // this.employee_list.push({ id: 'testuser3', no: 2 });
    // this.employee_list.push({ id: 'testuser2', no: 6 });
    // this.employee_list.push({ id: 'testuser', no: 3 });
    for(let i = 0, n = this.employee_list.length; i < n; i++) {
      if(this.employee_list[i].id == this.global_data.user_name) {
        this.employee_list.splice(i, 1);
        break;
      }
    }
  }

  public get_employee_list(group_id, list_is_empty: boolean = true): Promise<any>
  {
    if(group_id == null) {
      return this.api.get_all_employees(this.currentPage, this.limit).then(
        (employees) => {

        });
    }
    else {
      return this.chat.get_group_member(group_id).then(
        (members: any) => {
          members = JSON.parse(members);
          members.forEach((item) => {
            if(item['nickname'] == null || item['nickname'] == '')
              item['nickname'] = 1
            this.employee_list.push({
              id: item['userName'],
              no: item['nickname']
            })
          })
          console.log(members);
        })
    }
  }

  public update_select(item) {
    this.select_person = item;
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

  public go_back() {
    this.navCtrl.pop();
  } 

}
