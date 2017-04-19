import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Injectable()
export class NativeServiceHelper {
  constructor(
    private platform: Platform, 
    private network: Network) {
  }

  //网络类型: unknown, ethernet, wifi, 2g, 3g, 4g, cellular, none
  public is_network_connect(): boolean {
    return this.network.type != 'none';
  }
}