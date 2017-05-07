import { NativeServiceHelper } from './native_service_helper';
export class Notice {
  public send_person : string;
  public send_time : string;
  public content : string;

  constructor(json: any) {
    this.send_person = json["sendPerson"];
    this.send_time = json["sendTime"];
    this.content = json["content"];  
  }
}