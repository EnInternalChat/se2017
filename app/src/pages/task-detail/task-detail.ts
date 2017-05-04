import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Task } from '../../providers/task';
import { AppGlobal } from '../../providers/global_data';

/**
 * Generated class for the TaskDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetail {

  public task_info : Task;
  public user_name : string;
  public operation_options : Array<{value : string, text : string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let global_data = AppGlobal.get_instance();
    this.task_info = navParams.data.task;
    this.user_name = global_data.user_name;
    this.operation_options = [
      {"value": "yes", "text": "同意"},
      {"value": "no", "text": "驳回"}
    ];
    // console.log("detail: ", this.task_info.stages[0]);
  }

  go_back() {
    this.navCtrl.pop();
  }

}
