export class ImageMessage {
  public format: string;
  public width: number;
  public height: number;
  public local_path: string;
  public web_path: string;
  constructor(json) {
    this.format = json['format'];
    this.width = json['width'];
    this.height = json['height'];
    this.local_path = json['localThumbnailPath'];
    this.web_path = json['media_id'];
  }
}

export class Message {
  public id: number;
  public from_user: string;
  public from_user_avator: string;
  public is_img: boolean;
  public content: any;
  public create_time: string;
  constructor(json) {
    this.id = json['serverMessageId'];
    this.from_user = json['fromName'];
    this.from_user_avator = json['targetInfo']['nickname'];
    if(json['contentType'] === 'text')
      this.is_img = false;
    else
      this.is_img = true;
    this.create_time = new Date(json['createTimeInMillis']).toString();
    let msg_content = json['content'];
    if(msg_content == null)
      return;
    if(this.is_img)
      this.content = new ImageMessage(msg_content);
    else
      this.content = msg_content['text'];
  }
}

export class Conversation {
  public id: string;
  public is_single: boolean;
  public avator: string;

  public send_user_id: string;
  public send_user_name: string;

  public last_text: string;
  public is_text_img: boolean;
  public unread_message_n: number = 0;
  public last_msg_date: string;
  public msg_list: Array<Message> = [];

  constructor(json) {
    this.id = json['id'];
    if(json['type'] === 'single') {
      this.is_single = true;
      if(json['latestMessage'] == null)
        this.avator = '';
      else
        this.avator = json['latestMessage']['targetInfo']['nickname'];
    }
    else {
      this.is_single = false;
      this.avator = 'group_chat';
    }
    if(json['latestMessage'] == null) {
      this.send_user_name = this.send_user_id = json['targetId'];
    }
    else {
      this.send_user_id = json['latestMessage']['targetInfo']['userID'];
      this.send_user_name = json['latestMessage']['targetInfo']['userName'];
    }
    this.update_last_msg(json);
  }

  public update_last_msg(json) {
    this.last_text = json['latestText'];  
    if(json['latestType'] === 'text')
      this.is_text_img = false;
    else
      this.is_text_img = true;
    this.last_msg_date = new Date(json['lastMsgDate']).toString();
    this.unread_message_n = json['unReadMsgCnt'];
    if(!this.is_single) {
      if(json['latestMessage'] == null) {
        this.send_user_name = this.send_user_id = json['targetId'];
      }
      else {
        this.send_user_id = json['latestMessage']['targetInfo']['userID'];
        this.send_user_name = json['latestMessage']['targetInfo']['userName'];
      }
    }

  }

  public add_msg(json, is_single) {

  }
  
}