import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, Platform, Events } from 'ionic-angular';

import { NewGroupChat } from '../new-group-chat/new-group-chat';
import { NewSingleChat } from '../new-single-chat/new-single-chat';
import { ChatDetail } from '../chat-detail/chat-detail';

import { ChatService } from '../../providers/chats_service';
import { Conversation } from '../../providers/chat';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { AppGlobal } from '../../providers/global_data';
/**
 * Generated class for the ChatList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatList {

  public is_platform: boolean;
  public con_list: Array<Conversation>;

  public event_func: any;

  constructor(
      public platform: Platform,
      public changeDetect: ChangeDetectorRef,
      public navCtrl: NavController,
      public navParams: NavParams,
      public events: Events,
      public native: NativeServiceHelper,
      public chat_service: ChatService,
      public global_data: AppGlobal) {
  }

  ionViewDidLoad() {
    this.con_list = this.global_data.conversation_list;
    this.event_func = (msg: any) => this.onReceiveMsg(msg);
  }


  ionViewWillEnter() {
    this.native.loading();
    this.update_conversation_list().then(
      () => this.native.stop_loading()).catch(
      () => {
        console.log('Has some error');
        this.update_conversation_list().then(
          () => this.native.stop_loading());
      });
    document.addEventListener("jmessage.onReceiveMessage", 
      this.event_func);
  }

  ionViewWillLeave() {
    document.removeEventListener('jmessage.onReceiveMessage', 
      this.event_func);
  }

  public onReceiveMsg(msg: any) {
    this.native.loading();
    this.update_conversation_list().then(
      () => this.native.stop_loading());
  }

  public update_conversation_list(): Promise<any> {
    return this.chat_service.get_conversation_list().then(
      (data) => {
        if(data == null || data == "") {
          this.native.stop_loading();
          return;
        }
        if(!(typeof(data) == "object" && data.length >= 1))
          data = JSON.parse(data);
        for(let i = 0, n = data.length; i < n; i++) {
          this.add_conversation_item(data[i]);
        }
        return true;
      },
      (error) => this.native.show_toast("获取聊天列表失败"));
  }

  public add_conversation_item(json) {
    let new_con = new Conversation(json);

    for(let i = 0, n = this.con_list.length; i < n; i++) {
      if(this.con_list[i].is_single === new_con.is_single
        && this.con_list[i].target_id === new_con.target_id) {
        this.con_list[i].update_last_msg(json);
        return;
      }
    }
    console.log('add item');
    this.con_list.push(new_con);
  }

  public doRefresh(refresher) {
    this.update_conversation_list().then(
      () => refresher.complete());
  }

  public conversation_detail(conversation) {
    this.navCtrl.push(ChatDetail, {conversation: conversation});
  }

  public new_group_chat() {
    this.navCtrl.push(NewGroupChat);
  }

  public new_single_chat() {
    this.navCtrl.push(NewSingleChat);
  }

}
