import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChatService } from '../../providers/chats_service';
import { AppGlobal } from '../../providers/global_data';
import { Conversation, Message } from '../../providers/chat';
import { NativeServiceHelper } from '../../providers/native_service_helper';

/**
 * Generated class for the ChatDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetail {

  public con: Conversation;
  public is_single: boolean;
  public con_title: string;
  public msg_list: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public global_data: AppGlobal,
    public native: NativeServiceHelper,
    public chat_service: ChatService) {
  }

  ionViewDidLoad() {
    this.con = this.navParams.data.conversation;
    this.is_single = this.con.is_single;
    if(this.is_single)
      this.con_title = this.con.send_user_name;
    else
      this.con_title = this.con.group_name;
    this.msg_list = this.con.msg_list;
    // this.chat_service.enter_conversation(this.con.is_single, 
    //   this.global_data.user_name).then(
    //   () => {
    //     this.con.unread_message_n = 0;
    //     document.addEventListener("jmessage.onReceiveMessage",
    //     (msg: any) => this.on_receive_message(msg), false);
    //   },
    //   (error) => {
    //     this.native.show_toast('无法开始会话');
    //     this.go_back();
    //   });
  }

  ionViewWillUnload() {
    document.removeEventListener('jmessage.onReceiveMessage', () => {}, false);
  }

  public on_receive_message(msg: any) {
    this.con.msg_list.unshift(new Message(msg));
  }

  public get_unread_message() {

  }

  public get_history_message() {
    this.chat_service.get_message(this.global_data.user_name, 
      this.con.is_single, 0).then(
      (data) => {

      });
  }

  public load_more(refresher) {

  }

  public go_back() {
    this.chat_service.exit_conversation().then(
      () => {},
      (error) => this.native.show_toast('网络连接出现问题')).then(
      () => this.navCtrl.pop());
  }

}
