import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppGlobal } from '../../providers/global_data';
import { API } from '../../providers/api';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { UIText } from '../../providers/ui_text';

/**
 * Generated class for the NewTask page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-task',
  templateUrl: 'new-task.html',
})
export class NewTask {

  public user_name : string;
  public job : string;
  public comment: string;

  public task_type : string;
  public tasks_type_options : Array<{value : string, text : string}> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private global_data: AppGlobal,
              private native: NativeServiceHelper,
              private api: API,
              public ui: UIText) {
  }

  ionViewDidLoad() {
    this.user_name = this.global_data.user_name;
    this.job = this.global_data.job;
    this.api.get_tasks_type().then(
      (tasks) => {
        tasks = JSON.parse(tasks);
        if(tasks.length === 0) {
          this.native.show_toast("没有已部署的任务流程");
          this.navCtrl.pop();
          return;
        }
        tasks.forEach((item) => {
          this.tasks_type_options.push({
            value: item.id,
            text: item.name
          });
        });
        this.task_type = this.tasks_type_options[0].text;
      },
      (error) => this.native.show_toast("网络连接失败!"));
  }

  public start_task() {
    this.api.start_task(this.task_type, this.comment);
  }

  public go_back() {
      this.navCtrl.pop();
  }

}
