import { NativeServiceHelper } from './native_service_helper';
export class Notice {
  public id: string;
  public send_person: string;
  public send_time: string;
  public title: string;
  public content: string;
  public is_read: boolean;

  constructor(json: any) {
    this.id = json["notificationID"];
    this.send_person = json["sendPerson"];
    this.send_time = json["sendTime"];
    this.title = json["title"];
    this.content = json["content"];
    this.is_read = <boolean>json["read"];  
  }
}