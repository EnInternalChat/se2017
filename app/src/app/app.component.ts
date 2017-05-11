import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, Keyboard, ToastController } from 'ionic-angular';

import { Login } from '../pages/login/login';
import { BasisPage } from '../pages/basis-page/basis-page';
import { NativeServiceHelper } from '../providers/native_service_helper';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage = Login;
  rootPage = BasisPage;
  pages: Array<{title: string, component: any}>;
  backPressed: boolean = false;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private toastCtrl: ToastController,
    private keyBoard: Keyboard,
    private native: NativeServiceHelper,
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Login', component: Login },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(!this.native.is_network_connect()) {
        this.native.show_toast("无网络连接", 2000);
      }
      this.platform.registerBackButtonAction(() => {
        if(this.keyBoard.isOpen()) {
          this.keyBoard.close();
          return;
        }
        this.show_exit_toast();
        return;
      }, 1);
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  public show_exit_toast() {
    if(this.backPressed) {
      this.platform.exitApp();
    }
    else {
      this.native.show_toast("再按一次退出应用", 2000);
      this.backPressed = true;
      setTimeout(() => this.backPressed = false, 2000);
    }
  }
}
