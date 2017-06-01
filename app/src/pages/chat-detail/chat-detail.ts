import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, 
         ActionSheetController } from 'ionic-angular';

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

@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetail {
  @ViewChild(Content) content: Content;

  public con: Conversation;
  public is_single: boolean;
  public con_title: string;
  public msg_list: any;
  public msg_from: number;
  public input_msg: string;

  constructor(
    public actionCtrl: ActionSheetController,
    public changeDetect: ChangeDetectorRef,
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
    this.chat_service.enter_conversation(this.con.is_single, 
      this.con.target_id).then(
      () => {
        this.con.unread_message_n = 0;
        this.msg_list = [];
        this.msg_from = 0;
        this.get_history_message();
        document.addEventListener("jmessage.onReceiveMessage",
        (msg: any) => this.on_receive_message(msg), false);
        this.content.scrollToBottom(500);
      },
      (error) => {
        this.native.show_toast('无法开始会话');
        // this.go_back();
      });
  }

  ionViewWillUnload() {
    document.removeEventListener('jmessage.onReceiveMessage', () => {}, false);
  }

  public on_receive_message(msg: any) {
    this.msg_list.unshift(new Message(msg, this.global_data.user_name));
    this.changeDetect.detectChanges();
  }

  public get_history_message() {
    return this.chat_service.get_message(this.con.target_id, this.con.is_single, 
      this.msg_from).then(
      (data: any) => {
        if(data == null || data == '')
          return;
        if(!(typeof(data) == "object" && data.length >= 1))
          data = JSON.parse(data);
        let new_messages = [];
        let username = this.global_data.user_name;
        for(let i = 0, n = data.length; i < n; i++) {
          new_messages.push(new Message(data[i], username));
        }
        new_messages.reverse();
        this.msg_from += new_messages.length;
        this.msg_list = new_messages.concat(this.msg_list);
        return true;
      },
      (error) => this.native.show_toast('获取聊天记录失败'));
  }

  public load_more(refresher) {
    let msg_count = this.msg_from;
    this.get_history_message().then(
      () => {
        if(this.msg_from === msg_count)
          this.native.show_toast('没有更多聊天记录');
        refresher.complete();
      },
      () => refresher.complete());
  }

  public send_text_msg() {
    if(this.input_msg == null || this.input_msg == '' 
      || this.input_msg.match(/^\s*$/g))
      return;
    this.chat_service.send_text_message(this.con.target_id, 
      this.input_msg, this.is_single).then(
      (res: any) => {
        if(res == null)
          return;
        res = JSON.parse(res);
        res['fromName'] = res['fromID'];
        let new_msg = new Message(res, this.global_data.user_name);
        new_msg.from_user_avator = this.global_data.avator_no.toString();
        this.msg_list.push(new_msg);
        this.input_msg = '';
        this.content.scrollToBottom(500);
      });
  }

  public send_img_msg(image_data) {
    if(image_data == null || image_data == '')
      return;
  }

  public get_img_msg() {
    let img_action_selector = this.actionCtrl.create({
      cssClass: "image-actionsheet"
    });
    img_action_selector.addButton({
      text: '拍照', icon:'md-camera', handler: () => this.take_photo()});
    img_action_selector.addButton({
      text: '从相册选择', icon: 'md-images', handler: () => this.pick_image()});
    img_action_selector.present();
  }

  public take_photo() {

  }

  public pick_image() {

  }

  public go_back() {
    this.chat_service.exit_conversation().then(
      () => {},
      (error) => this.native.show_toast('网络连接出现问题')).then(
      () => this.navCtrl.pop());
  }

}
