import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppGlobal } from '../../providers/global_data';
/**
 * Generated class for the NewTask page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-task',
  templateUrl: 'new-task.html',
})
export class NewTask {

  public user_name : string;
  public job : string;

  public task_type : string;
  public tasks_type_options : Array<{value : string, text : string}>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    let global_data = AppGlobal.get_instance();
    this.user_name = global_data.user_name;
    this.job = global_data.job;
    this.tasks_type_options = [
      {"value": "leave", "text": "请假"},
      {"value": "play", "text": "玩耍"}
    ];
    this.task_type = this.tasks_type_options[0].value;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTask');
  }

  add_task() {

  }

  go_back() {
      this.navCtrl.pop();
  }

}
