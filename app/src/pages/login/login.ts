import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppGlobal } from '../../providers/global_data';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  login: {username?: string, password?: string} = {};
  avator_path: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let storage = AppGlobal.get_instance();
    this.login.username = storage.user_name;
    this.avator_path = "assets/img/avator/" + storage.avator_no + ".png";
  }

  on_login(form: NgForm) {
    console.log("user: " + this.login.username);
    console.log("password: " + this.login.password);
    // this.set_avator();
    AppGlobal.get_instance().user_name = this.login.username;
  }

  set_avator() {
    this.avator_path = "assets/img/avator/1.png"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
