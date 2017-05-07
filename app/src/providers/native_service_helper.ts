import { Injectable } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Injectable()
export class NativeServiceHelper {
  constructor(
    private platform: Platform, 
    private network: Network,
    private toastCtrl: ToastController) {
  }

  //网络类型: unknown, ethernet, wifi, 2g, 3g, 4g, cellular, none
  public is_network_connect(): boolean {
    return this.network.type != 'none';
  }

  public show_toast(words: string, time: number, pos: string): void {
      if(pos != "bottom" && pos != "top")
          return;
      this.toastCtrl.create({
          message: words,
          duration: time,
          position: pos,
      }).present();
  }

  public static format_time(time: string): string {
    let cur_time = new Date(new Date().getTime());
    let cur_year: string = cur_time.getFullYear().toString();
    let cur_month: string = (cur_time.getMonth() + 1) < 10 ? '0' + (cur_time.getMonth() + 1) 
      : (cur_time.getMonth() + 1).toString();
    let cur_day: string = cur_time.getDate() < 10 ? '0' + cur_time.getDate()
      : cur_time.getDate().toString();
    let cur_date_str = cur_year + '-' + cur_month + '-' + cur_day;
    let time_array = time.split(' ');
    if(cur_date_str == time_array[0]) {
      return time_array.length >= 2 ? time_array[1] : time_array[0];
    }
    else {
      let date_array = time_array[0].split('-');
      if(date_array[0] == cur_year && date_array.length >= 3)
        return date_array[1] + '-' + date_array[2];
      else if(date_array[0] != cur_year)
        return date_array[0];
      else
        return time_array[0];
    }
  }
}