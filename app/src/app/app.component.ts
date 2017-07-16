import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, Keyboard, Events } from 'ionic-angular';

import { Login } from '../pages/login/login';
import { BasisPage } from '../pages/basis-page/basis-page';
import { NativeServiceHelper } from '../providers/native_service_helper';
import { ChatDetail } from '../pages/chat-detail/chat-detail';
import { API } from '../providers/api';
import { ChatService } from '../providers/chats_service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

declare let window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = Login;
  // rootPage = BasisPage;
  // rootPage = ChatDetail;
  backPressed: boolean = false;

  constructor(
    public api: API,
    public chat_service: ChatService,
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private events: Events,
    private keyBoard: Keyboard,
    private native: NativeServiceHelper,
    private network: Network) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initJPush();
      this.platform.registerBackButtonAction(() => {
        if(this.keyBoard.isOpen()) {
          this.keyBoard.close();
          return;
        }
        this.native.stop_loading();
        this.show_exit_toast();
        return;
      }, 1);
      this.network.onDisconnect().subscribe(() => {
        this.native.show_toast('网络连接断开');
        this.native.is_offline = true;
      });
      this.network.onConnect().subscribe(() => {
        this.native.is_offline = false;
      })
    });
  }

  initJPush() {
    if(!this.platform.is('android') && !this.platform.is('ios'))
      return;
    //启动极光推送
    if(window.plugins && 　window.plugins.jPushPlugin) {
      window.plugins.jPushPlugin.init();
      document.addEventListener("jpush.openNotification", 
        () => {
          let keys_dict;
          if(this.platform.is('android')) {
            keys_dict = window.plugins.jPushPlugin.openNotification.extras;
          }
          else if(this.platform.is('ios')) {
            keys_dict = window.plugins.jPushPlugin.openNotification;
          }
          this.events.publish('open_notice', keys_dict['page']);
          return true;
        }, false);
      document.addEventListener('jmessage.onOpenMessage', 
        (msg: any) => {
          this.events.publish('open_notice', 0);
          return true;
        }, false);
    }
  }

  public show_exit_toast() {
    if(this.backPressed) {
      let p1 = this.api.logout();
      let p2 = this.chat_service.logout();
      this.native.loading();
      Promise.all([p1, p2]).then(
        () => {
          this.native.stop_loading();
          this.platform.exitApp();
        });
    }
    else {
      this.native.show_toast("再按一次退出应用", 2000);
      this.backPressed = true;
      setTimeout(() => this.backPressed = false, 2000);
    }
  }
}
