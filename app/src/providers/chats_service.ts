import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { HTTPService } from './http_helper';
import { AppGlobal } from './global_data';

declare let window;
declare let JMessage: any;


@Injectable()
export class ChatService {
  public is_platform: boolean;
  public is_android: boolean;
  public message_count: number = 10;
  private JIM: any;

  constructor(
    public platform: Platform,
    public data: AppGlobal,
    public http: HTTPService) {
    this.JIM = new JMessage();
    if((this.platform.is('android') || this.platform.is('ios'))
      && this.platform.userAgent().indexOf('Linux x86_64') == -1) {
      this.is_platform = true;
      if(this.platform.is('android')) {
        this.is_android = true;
      }      
      else {
        this.is_android = false;
      }
    }
    else 
      this.is_platform = false;
  }

  public login(username, password): Promise<any> {
    if(!this.is_platform)
      return Promise.resolve(true);
    else {
      // if(this.is_android) {
        return new Promise((resolve, reject) => 
          window.JMessage.login(username, password, resolve, reject));              
      // }
      // else {
      //   return new Promise((resolve, reject) => {
      //     return this.JIM.init(this.data.auth_payload)
      //       .onSuccess((data) => { 
      //         return this.JIM.login({
      //           "username": username,
      //           "password": password
      //         }).onSuccess((data) => { 
      //           return resolve(data); 
      //         })
      //         .onFail((data) => { 
      //           return reject(data) 
      //         });
      //       })
      //       .onFail((data) => { 
      //         return reject(data); 
      //       });
      //   })
      // }
    }
  }

  public logout(): Promise<any> {
    // if(this.is_android) {
      return new Promise((resolve, reject) => 
        window.JMessage.logout(resolve, reject));      
    // }
    // else {
    //   this.JIM.loginOut();
    //   return Promise.resolve(true);
    // }
  }

  public set_alias(alias) {
    if(!this.is_platform)
      return;
    if (alias && alias.trim() != '') {
      window.plugins.jPushPlugin.setAlias(alias);
    }
    else 
      alert('Alias不能为空');
  }

  public get_conversation_list(): Promise<any> {
    // if(this.is_android) {
      console.log(window.JMessage);
      return new Promise((resolve, reject) =>
        window.JMessage.getConversationList(resolve, reject));      
    // }
    // else {
    //   return new Promise((resolve, reject) => {
    //     return this.JIM.getConversation()
    //       .onSuccess((data) => {
    //         return resolve(data.conversations);
    //       })
    //       .onFail((data) => { 
    //         return reject(data); 
    //       })
    //   });
    // }
  }

  // Android only
  public enter_conversation(is_single: boolean, target: string): Promise<any> {
    if(!this.is_android)
      return Promise.resolve(true);
    if(is_single) {
      return new Promise((resolve, reject) =>
        window.JMessage.enterSingleConversation(target, null, resolve, reject));
    }
    else {
      return new Promise((resolve, reject) =>
        window.JMessage.enterGroupConversation(target, resolve, reject));
    }
  }

  public clear_unread_msg(is_single: boolean, username: string) {
    if(this.is_platform && this.is_android) {
      if(is_single) {
        return new Promise((resolve, reject) => 
          window.JMessage.setSingleConversationUnreadMessageCount(
            username, null, 0, resolve, reject));
      }
      else {
        return new Promise((resolve, reject) =>
          window.JMessage.setGroupConversationUnreadMessageCount(
            username, 0, resolve, reject));
      }
    }
    else if(this.is_platform && !this.is_android) {
      if(is_single) {
        return new Promise((resolve, reject) =>
          window.JMessage.clearSingleUnreadCount(username, resolve, reject));
      }
      else {
        return new Promise((resolve, reject) => 
          window.JMessage.clearGroupUnreadCount(username, resolve, reject));
      }
    }
  }

  public exit_conversation() {
    if(!this.is_android)
      return Promise.resolve(true);
    return new Promise((resolve, reject) =>
      window.JMessage.exitConversation(resolve, reject));
  }

  public get_message(username: string, is_single: boolean, from: number) {
    return new Promise((resolve, reject) => 
      window.JMessage.getHistoryMessages(is_single ? 'single' : 'group', 
        username, null, from, this.message_count, resolve, reject));
  }

  // Android only
  public get_message_image(username: string, is_single: boolean, msg_id: number) {
    if(is_single) {
      return new Promise((resolve, reject) =>
        window.JMessage.getOriginImageInSingleConversation(
          username, msg_id, resolve, reject));      
    }
    else {
      return new Promise((resolve, reject) =>
        window.JMessage.getOriginImageInGroupConversation(
          username, msg_id, resolve, reject));
    }

  }

  public send_text_message(target: string, content: string, is_single: boolean) {
    if(is_single) {
      return new Promise((resolve, reject) =>
        window.JMessage.sendSingleTextMessage(
          target, content, null, resolve, reject));
    }
    else {
      return new Promise((resolve, reject) =>
        window.JMessage.sendGroupTextMessage(
          target, content, resolve, reject));
    }
  }

  public send_image_message(target: string, image: string, is_single: boolean) {
    if(is_single) {
      return new Promise((resolve, reject) => 
        window.JMessage.sendSingleImageMessage(
          target, image, null, resolve, reject));
    }
    else {
      return new Promise((resolve, reject) =>
        window.JMessage.sendGroupImageMessage(
          target, image, resolve, reject));
    }
  }

  public get_group_member(group_id) {
    if(this.is_platform && this.is_android) {
      return new Promise((resolve, reject) =>
        window.JMessage.getGroupMembers(group_id, resolve, reject));
    }
    else if(this.is_platform && !this.is_android) {
      return new Promise((resolve, reject) =>
        window.JMessage.memberArray(group_id, resolve, reject));
    }
  }


}