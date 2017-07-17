export class ImageMessage {
  public format: string;
  public local_path: string;
  public web_path: string;
  public origin_path: string;
  constructor(json) {
    if(json == null)
      return;
    this.format = json['format'];
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
  public is_my_send: boolean;

  public show_time: boolean;
  public create_time: string;
  public create_time_ms: number;

  constructor(json, cur_username: string) {
    if(json == null)
      return;
    this.id = json['serverMessageId'];
    this.from_user = json['fromName'];
    this.from_user_avator = json['fromNickname'];
    if(this.from_user_avator == null || this.from_user_avator == "")
      this.from_user_avator = "1";
    if(json['contentType'] === 'text')
      this.is_img = false;
    else
      this.is_img = true;
    this.show_time = false;
    this.create_time = new Date(json['createTimeInMillis']).toString();
    this.create_time_ms = json['createTimeInMillis'];
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
    if(json == null)
      return;
    this.id = json['id'];
    if(json['type'] === 'single') {
      this.is_single = true;
      if(json['targetInfo'])
        this.avator = json['targetInfo']['nickname'];
      else if(!json['latestMessage'])
        this.avator = json['latestMessage']['targetInfo']['nickname'];
      else
        this.avator = "1";
    }
    else {
      this.is_single = false;
      this.avator = 'group_chat';
      this.group_id = json['targetInfo']['groupID'];
      this.group_name = json['targetInfo']['groupName'];
    }
    if(!json['latestMessage']) {
      if(this.is_single) {
        this.send_user_name = json['targetInfo']['userName'];
        this.send_user_id = json['targetInfo']['userID'];
      }
      else 
        this.send_user_id = this.send_user_name = '';
    }
    else {
      if(this.is_single) {
        if(!json['targetInfo']) {
          json['targetInfo'] = json['latestMessage']['targetInfo'];
        }
        this.send_user_id = json['targetInfo']['userID'];
        this.send_user_name = json['targetInfo']['userName'];        
      }
      else 
        this.send_user_id = this.send_user_name = json['latestMessage']['fromID'];
    }
    this.update_last_msg(json);
  }

  public update_last_msg(json) {
    if(this.id == null && json['id'] != null)
      this.id = json['id'];
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
  
}

// 1 s = 1000 ms
// 2 min = 120000 ms
// 10 min = 600000 ms 
const MSG_TIME_OFFSET = 120000;
const MSG_TIME_SUM = 600000;
const MSG_COUNT = 8;

export class MessageList {
  public list: Array<Message> = [];
  public from: number;

  public sum_first_time: number;
  public sum_last_time: number;
  public sum_count: number;
  public first_time: number;
  public last_time: number;

  constructor() {
    this.from = 0;
    this.sum_first_time = this.sum_last_time = 0;
    this.sum_count = 0;
    this.first_time = this.last_time = new Date().getTime();
  }

  public push(msg: Message) {
    if(this.list.length > 0) {
      let offset = msg.create_time_ms - this.last_time;
      if(offset < 0)
        return;
      if(offset > MSG_TIME_OFFSET 
        || this.sum_last_time > MSG_TIME_SUM
        || this.sum_count > MSG_COUNT) {
        this.sum_last_time = 0;
        this.sum_count = 0;
        msg.show_time = true;
      }      
      else {
        this.sum_last_time += offset;
      }
    }
    this.list.push(msg);
    this.last_time = msg.create_time_ms;
    this.from++;
  }

  public unshift(msg: Message) {
    if(this.list.length > 0) {
      let offset = this.first_time - msg.create_time_ms;
      if(offset < 0)
        return;
      if(offset > MSG_TIME_OFFSET 
        || this.sum_first_time > MSG_TIME_SUM) {
        this.sum_first_time = 0;
        this.list[0].show_time = true;
      }
      else {
        this.sum_first_time += offset;
      }
    }
    this.list.unshift(msg);
    this.first_time = msg.create_time_ms;
    this.from++;
  }


}