import { Injectable } from '@angular/core';
import { Platform, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { UIText } from './ui_text';

@Injectable()
export class NativeServiceHelper {
  private load: Loading;

  constructor(
    private platform: Platform, 
    private network: Network,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private ui: UIText) {
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

  public loading(message ?: string) {
    if(message == null)
      message = this.ui.loading;
    if(this.load != null) {
      return;
    }
    this.load = this.loadCtrl.create({ content: message });
    this.load.present();
    setTimeout(() => this.stop_loading(), 10000);
  }

  public stop_loading() {
    if(this.load == null)
      return;
    else {
      this.load.dismiss();
      this.load = null;
    }
  }
}