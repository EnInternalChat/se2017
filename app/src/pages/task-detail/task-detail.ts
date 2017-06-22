import { Component } from '@angular/core';
import { NavController, NavParams, Config, AlertController } from 'ionic-angular';

import { Task } from '../../providers/task';
import { AppGlobal } from '../../providers/global_data';
import { UIText } from '../../providers/ui_text';
import { API } from '../../providers/api';

/**
 * Generated class for the TaskDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetail {

  public task_info : Task;
  public user_name : string;
  public operation_options : Array<{value : string, text : string}> = [];
  
  constructor(
    public ui: UIText,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: Config,
    private global_data: AppGlobal,
    public api: API) {
    this.task_info = navParams.data.task;
    this.user_name = global_data.user_name;
    if(this.task_info.over)
      return;
    let gateways = this.task_info.stages[this.task_info.stages.length - 1].exclusive_gateway;
    gateways.forEach(
      (item) => this.operation_options.push({
        "value": item.operationID,
        "text": item.operationName
      }));
    console.log("Options: ", this.operation_options);
  }

  public operation_form() {
    let form = this.alertCtrl.create({
      title: '',
      cssClass: 'form-alert',
      buttons: [
      {
        text: this.ui.cancel,
        role: 'cancel'
      },
      {
        text: this.ui.ok,
        handler: data => {
          
        }
      }
      ]
    });
    form.addInput({});
  }

  public gateway_operate(operate_id) {
    this.api.operate_task(this.task_info.type, this.task_info.activity_id, operate_id);
  }

  go_back() {
    this.config.set('ios', 'pageTransition', 'md-transition');
    this.navCtrl.pop();
  }

}
