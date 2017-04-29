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
}