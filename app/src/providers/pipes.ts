import { Pipe, PipeTransform } from '@angular/core'


@Pipe(
{
  name: 'time_format',
  pure: false
})
export class MyTimeFormat implements PipeTransform {
  private cur_date_str: string;
  private cur_year_str: string;
  transform(value: string, args: string[]): any {
    if(!this.cur_date_str) {
      let cur_time = new Date(new Date().getTime());
      let cur_year: string = cur_time.getFullYear().toString();
      let cur_month: string = (cur_time.getMonth() + 1) < 10 ? '0' + (cur_time.getMonth() + 1) 
        : (cur_time.getMonth() + 1).toString();
      let cur_day: string = cur_time.getDate() < 10 ? '0' + cur_time.getDate()
        : cur_time.getDate().toString();
      this.cur_date_str = cur_year + '-' + cur_month + '-' + cur_day;
      this.cur_year_str = cur_year.toString();
    }
    let time_array = value.split('T');
    if(time_array[0] == this.cur_date_str)
      return time_array[1].split('+')[0];
    else {
      let date_array = time_array[0].split('-');
      return date_array[1] + '/' + date_array[2];
    }
  }
}


@Pipe(
{
  name: 'markdown_parser'
})
export class MarkDownParser implements PipeTransform {
  transform(value: string, args: string[]): any {
    return value.replace(/[#\*\+~=\^!\[\]\(\)`>]/g, "");
  }
}


@Pipe(
{
  name: 'msg_time_format',
  pure: false
})
export class MessageTimeFormat implements PipeTransform {
  private now_zero_ms: number;
  private yester_zero_ms: number;
  private before_yester_zero_ms: number;
  transform(value: string, args: string[]): any {
    if(!this.now_zero_ms) {
      let now = new Date();
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);
      this.now_zero_ms = now.getTime();
      this.yester_zero_ms = this.now_zero_ms - 86400000;
      this.before_yester_zero_ms = this.yester_zero_ms - 86400000;
    }
    let time = new Date(value);
    let time_ms = time.getTime();
    let hour  = time.getHours(), min = time.getMinutes();
    let hour_str = (hour > 9 ? hour.toString() : "0" + hour.toString());
    let min_str = (min > 9 ? min.toString() : "0" + min.toString());
    if(time_ms >= this.now_zero_ms) {
      return "今天 " + hour_str + ":" + min_str;
    }
    else if(time_ms >= this.yester_zero_ms) {
      return "昨天 " + hour_str + ":" + min_str;
    }
    else if(time_ms >= this.before_yester_zero_ms) {
      return "前天 " + hour_str + ":" + min_str;
    }
    else {
      return time.getFullYear().toString() + "-" 
        + (time.getMonth() + 1).toString() + "-"
        + (time.getDate()).toString() + " " + hour_str
        + ":" + min_str;
    }
  }
}