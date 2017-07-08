import { NativeServiceHelper } from './native_service_helper';
export class Notice {
  public id: string;
  public send_person: string;
  public send_time: string;
  public title: string;
  public content: string;
  public is_read: boolean;

  constructor(json: any) {
    this.id = json["ID"];
    this.send_person = json["senderName"];
    this.send_time = json["sentTime"];
    this.title = json["title"];
    this.content = json["content"];
  }
}