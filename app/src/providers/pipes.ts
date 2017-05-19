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
  name: 'markdown_parser',
})
export class MarkDownParser implements PipeTransform {
  transform(value: string, args: string[]): any {
    return value.replace(/[#\*\+~=\^!\[\]\(\)`>]/g, "");
  }
}