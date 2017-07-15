import { Component } from '@angular/core';
import { NavController, NavParams, Config, AlertController, 
         ActionSheetController } from 'ionic-angular';

import { Task, TaskStage } from '../../providers/task';
import { AppGlobal } from '../../providers/global_data';
import { UIText } from '../../providers/ui_text';
import { API } from '../../providers/api';
import { NativeServiceHelper } from '../../providers/native_service_helper';

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
    public actionCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: Config,
    private data: AppGlobal,
    public api: API,
    public ui: UIText,
    public native: NativeServiceHelper) {
    this.task_info = this.navParams.get("task");
    this.user_name = this.data.user_name;
    if(this.task_info.over)
      return;
    let gateways = this.task_info.stages[this.task_info.stages.length - 1].exclusive_gateway;
    gateways.forEach(
      (item) => this.operation_options.push({
        "value": item.operationID,
        "text": item.operationName
      }));
  }

  ionViewDidLoad() {

  }

  public operation_form(operate_id) {
    let alert = this.alertCtrl.create({
      title: '备 注',
      inputs: [
        {
          name: 'info',
          placeholder: '备注'
        }
      ],
      cssClass: 'form-alert',
      buttons: [
      {
        text: this.ui.cancel,
        role: 'cancel'
      },
      {
        text: this.ui.ok,
        handler: data => {
          this.native.loading();
          this.api.operate_task(this.task_info.activity_id, 
            this.task_info.process_id, operate_id, data.info).then((res) => {
              if(!res || !res.body.done)
                this.native.show_toast(res.body.info)
              else {
                this.native.show_toast("操作成功");
                this.navCtrl.pop();
              }
              this.native.stop_loading();
            });
          return true;
        }
      }
      ]
    });
    alert.present();
  }

  public show_operate_list() {
    let action = this.actionCtrl.create({
      title: '选择操作'
    });
    this.operation_options.forEach((item) => {
      action.addButton({
        text: item.text,
        handler: () => {
          this.operation_form(item.value);
          return true;
        }
      })
    });
    action.present();
  }

  public stage_detail(stage) {
    let detail_alert = this.alertCtrl.create({
      title: stage.title,
      message: stage.content,
      buttons: ['确认'],
      cssClass: 'form-alert'
    });
    detail_alert.present();
  }

  public go_back() {
    this.config.set('ios', 'pageTransition', 'md-transition');
    this.navCtrl.pop();
  }

}
