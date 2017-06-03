import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { HTTPService } from './http_helper';

declare let window;

@Injectable()
export class ChatService {
  public is_platform: boolean;
  public message_count: number = 10;

  constructor(
    public platform: Platform,
    public http: HTTPService) {
    if((this.platform.is('android') || this.platform.is('ios'))
      && this.platform.userAgent().indexOf('Linux x86_64') == -1)
      this.is_platform = true;
    else 
      this.is_platform = false;
    // this.is_platform = false;
  }

  public login(username, password): Promise<any> {
    return new Promise((resolve, reject) => 
      window.JMessage.login(username, password, resolve, reject));
  }

  public logout(): Promise<any> {
    return new Promise((resolve, reject) => 
      window.JMessage.logout(resolve, reject));
  }

  public get_conversation_list(): Promise<any> {
    return new Promise((resolve, reject) =>
      window.JMessage.getConversationList(resolve, reject));
  }

  public enter_conversation(is_single: boolean, target: string): Promise<any> {
    if(is_single) {
      return new Promise((resolve, reject) =>
        window.JMessage.enterSingleConversation(target, null, resolve, reject));
    }
    else {
      return new Promise((resolve, reject) =>
        window.JMessage.enterGroupConversation(target, resolve, reject));
    }
  }

  public set_unread_msg(is_single: boolean, username: string, msg_count: number) {
    if(is_single) {
      return new Promise((resolve, reject) => 
        window.JMessage.setSingleConversationUnreadMessageCount(
          username, null, msg_count, resolve, reject));
    }
    else {
      return new Promise((resolve, reject) =>
        window.JMessage.setGroupConversationUnreadMessageCount(
          username, msg_count, resolve, reject));
    }
  }

  public exit_conversation() {
    return new Promise((resolve, reject) =>
      window.JMessage.exitConversation(resolve, reject));
  }

  public get_message(username: string, is_single: boolean, from: number) {
    return new Promise((resolve, reject) => 
      window.JMessage.getHistoryMessages(is_single ? 'single' : 'group', 
        username, null, from, this.message_count, resolve, reject));
  }

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


}