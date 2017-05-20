import { Injectable } from '@angular/core';
import { Platform, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Injectable()
export class NativeServiceHelper {
  private load: Loading;

  constructor(
    private platform: Platform, 
    private network: Network,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController) {
  }

  //网络类型: unknown, ethernet, wifi, 2g, 3g, 4g, cellular, none
  public is_network_connect(): boolean {
    return this.network.type != 'none';
  }

  public show_toast(words: string, time: number = 2000, pos: string = 'bottom'): void {
      if(pos != "bottom" && pos != "top")
          return;
      this.toastCtrl.create({
          message: words,
          duration: time,
          position: pos,
      }).present();
  }

  public loading(message: string = '请稍候...') {
    if(this.load == null) {
      this.load = this.loadCtrl.create({ content: message });
      this.load.present();
    }
  }

  public stop_loading() {
    if(this.load == null)
      return;
    this.load.dismiss();
    this.load = null;
  }
}