import { Component } from '@angular/core';
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
  public conversation_list: Array<Conversation>;

  public event_func: any;

  constructor(
      public platform: Platform,
      public navCtrl: NavController,
      public navParams: NavParams,
      public events: Events,
      public native: NativeServiceHelper,
      public chat_service: ChatService,
      public global_data: AppGlobal) {
  }

  ionViewDidLoad() {
    this.conversation_list = this.global_data.conversation_list;
    this.event_func = (msg: any) => this.onReceiveMsg(msg);
  }


  ionViewWillEnter() {
    this.update_conversation_list();
    document.addEventListener("jmessage.onReceiveMessage", 
      this.event_func);
  }

  ionViewWillLeave() {
    document.removeEventListener('jmessage.onReceiveMessage', 
      this.event_func);
  }

  public onReceiveMsg(msg: any) {
    console.log(this);
    this.update_conversation_list();
  }

  public update_conversation_list() {
    this.native.loading();
    this.chat_service.get_conversation_list().then(
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
        this.native.stop_loading();
      },
      (error) => {
        this.native.stop_loading();
        this.native.show_toast("获取聊天列表失败");
      }).catch(
      () => {
        this.update_conversation_list();
        // this.native.stop_loading();
        // this.native.show_toast("无法连接到服务器");
      });
  }

  public add_conversation_item(json) {
    let con_id = json['id'];
    let in_list = false;

    for(let i = 0, n = this.conversation_list.length; i < n; i++) {
      if(this.conversation_list[i].id == con_id) {
        this.conversation_list[i].update_last_msg(json);
        in_list = true;
        break;
      }
    }
    if(!in_list) {
      console.log('add item');
      this.conversation_list.push(new Conversation(json));
    }
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
