import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { API } from './api';
import { AppGlobal } from './global_data';

declare let window;


@Injectable()
export class ChatService {
  public is_platform: boolean;
  public is_android: boolean;
  public message_count: number = 10;

  constructor(
    public platform: Platform,
    public data: AppGlobal,
    public api: API) {
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

  public init() {
    if(!this.is_platform)
      return Promise.resolve(true);
    else {
      window.plugins.jPushPlugin.init();
      return Promise.resolve(true);
    }
  }

  public login(username, password): Promise<any> {
    if(!this.is_platform)
      return Promise.resolve(true);
    else {
      return new Promise((resolve, reject) => 
        window.JMessage.login(username, password, resolve, reject));
    }
  }

  public logout(): Promise<any> {
    return new Promise((resolve, reject) => 
      window.JMessage.logout(resolve, reject));      
  }

  public set_alias(alias) {
    if(!this.is_platform)
      return Promise.resolve(true);
    if (alias && alias.trim() != '') {
      return new Promise((resolve, reject) => 
        window.plugins.jPushPlugin.setAlias(alias, resolve, reject));
    }
    else {
      alert('Alias不能为空');
      return Promise.resolve(true);
    }
  }

  public get_conversation_list(): Promise<any> {
    if(!window.JMessage)
      alert("NULL JMessage");
    return new Promise((resolve, reject) =>
      window.JMessage.getConversationList(resolve, reject));      
  }

  public parse_ios_conversation(json) {
    let msg_type = (json["lastMessage"] === "[图片]" ? "image" : "text");
    if(json["gid"]) {
      return {
        "id": json["gid"],
        "type": "group",
        "targetInfo": {
          "groupID": json["gid"],
          "groupName": json["name"]
        },
        "latestText": json["lastMessage"],
        "latestType": msg_type,
        "lastMsgDate": json["timestamp"],
         "unReadMsgCnt": json["unreadCount"]
      }
    }
    return {
      "id": json["appkey"],
      "type": "single",
      "targetInfo": {
        "nickname": json["nickname"],
        "userID": json["username"],
        "userName": json["username"]
      },
      "latestText": json["lastMessage"],
      "latestType": msg_type,
      "lastMsgDate": json["timestamp"],
      "unReadMsgCnt": json["unreadCount"]
    }
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

  public parse_ios_message(json) {
    let content_type = (json["contentType"] === "1" ? "text" : "image");
    let content = json["content"];
    let res = {
      "serverMessageId": json["msgId"],
      "contentType" : content_type,
      "fromID": content["from_id"],
      "fromName": content["from_id"],
      "fromNickname": content["from_name"],
      "createTimeInMillis": content["create_time"],
    };
    if(content_type === "text") {
      res["content"] = content["msg_body"]
    }
    else {
      res["content"] = {
        "format": "png",
        "local_path" : content["media_id"],
        "web_path": content["media_id"],
        "origin_path": content["media_id"]
      }
    }
    return res;
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
