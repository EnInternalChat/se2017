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
    if(!this.is_platform)
      return this.http.get('assets/data/conversation_list.json', null);
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

  public exit_conversation() {
    return new Promise((resolve, reject) =>
      window.JMessage.exitConversation(resolve, reject));
  }

  public get_message(username: string, is_single: boolean, from: number) {
    return new Promise((resolve, reject) => 
      window.JMessage.getHistoryMessages(is_single ? 'single' : 'group', 
        username, null, from, this.message_count, resolve, reject));
  }

  public send_text_message(target: string, content: string, is_single: boolean) {
    if(is_single) {
      return new Promise((resolve, reject) =>
        window.JMessage.sendSingleTextMessage(target, content, null, resolve, reject));
    }
    else {
      return new Promise((resolve, reject) =>
        window.JMessage.sendGroupTextMessage(target, content, resolve, reject));
    }
  }


}