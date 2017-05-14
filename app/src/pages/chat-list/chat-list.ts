import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { NewGroupChat } from '../new-group-chat/new-group-chat';
import { NewSingleChat } from '../new-single-chat/new-single-chat';
/**
 * Generated class for the ChatList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatList {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ChatList');
    // this.new_group_chat();
    this.new_single_chat();
  }

  new_group_chat() {
    this.navCtrl.push(NewGroupChat);
  }

  new_single_chat() {
    this.navCtrl.push(NewSingleChat);
  }

}
