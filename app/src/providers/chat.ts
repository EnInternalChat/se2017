export class ImageMessage {
  public format: string;
  public width: number;
  public height: number;
  public local_path: string;
  public web_path: string;
  public origin_path: string;
  constructor(json) {
    this.format = json['format'];
    this.width = json['width'];
    this.height = json['height'];
    this.local_path = json['localThumbnailPath'];
    this.web_path = json['media_id'];
    if(json['local_path'])
      this.origin_path = json['local_path'];
    else
      this.origin_path = null;
  }
}

export class Message {
  public id: number;
  public from_user: string;
  public from_user_avator: string;
  public is_img: boolean;
  public content: any;
  public create_time: string;
  public is_my_send: boolean;
  constructor(json, cur_username: string) {
    this.id = json['serverMessageId'];
    this.from_user = json['fromName'];
    this.from_user_avator = json['fromNickname'];
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
    this.is_my_send = (cur_username === this.from_user);
  }
}

export class Conversation {
  public id: string;
  public is_single: boolean;
  public avator: string;

  public group_id: string;
  public group_name: string;
  public send_user_id: string;
  public send_user_name: string;

  public last_text: string;
  public is_text_img: boolean;
  public unread_message_n: number = 0;
  public last_msg_date: string;
  public msg_list: Array<Message> = [];

  get target_id() {
    if(this.is_single)
      return this.send_user_name;
    else
      return this.group_id;
  }

  constructor(json) {
    this.id = json['id'];
    if(json['type'] === 'single') {
      this.is_single = true;
      this.avator = json['targetInfo']['nickname'];
    }
    else {
      this.is_single = false;
      this.avator = 'group_chat';
      this.group_id = json['targetInfo']['groupID'];
      this.group_name = json['targetInfo']['groupName'];
    }
    if(json['latestMessage'] == null) {
      if(this.is_single) {
        this.send_user_name = json['targetInfo']['userName'];
        this.send_user_id = json['targetInfo']['userID'];
      }
      else 
        this.send_user_id = this.send_user_name = '';
    }
    else {
      if(this.is_single) {
        this.send_user_id = json['targetInfo']['userID'];
        this.send_user_name = json['targetInfo']['userName'];        
      }
      else 
        this.send_user_id = this.send_user_name = json['latestMessage']['fromID'];
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
        this.send_user_name = this.send_user_id = '';
      }
      else 
        this.send_user_id = this.send_user_name = json['latestMessage']['fromID'];
    }

  }

  public add_msg(json, is_single) {

  }
  
}