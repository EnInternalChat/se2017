import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, Config, Events } from 'ionic-angular';

import { TaskDetail } from '../task-detail/task-detail';
import { NewTask } from '../new-task/new-task';
import { API } from '../../providers/api';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { Task } from '../../providers/task';
import { AppGlobal } from '../../providers/global_data';
import { UIText } from '../../providers/ui_text';

/**
 * Generated class for the TaskList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskList {

  private _name_ = "TaskList";

  task_status_array: Array<string> = ['tasks_not_done', 'tasks_done'];
  task_status : string = this.task_status_array[0];

  tasks_list_not_done : Array<Task> = [];
  tasks_list_done: Array<Task> = [];

  currentPage: number = 0;
  limit: number = 10;
  hasNextPage: boolean = true;

  constructor(public changeDetect: ChangeDetectorRef,
              public navCtrl: NavController,
              public navParams: NavParams,
              public config: Config,
              public events: Events,
              public api: API,
              public native: NativeServiceHelper,
              public data: AppGlobal,
              public ui: UIText) {
  }

  ionViewDidLoad() {
    this.currentPage = 0;
    this.hasNextPage = true;
    this.tasks_list_not_done = [];
    this.tasks_list_done = [];
    this.native.loading("请稍候...");
    this.update_tasks_list(true).then(
      () => this.native.stop_loading());    
  }

  ionViewDidEnter() {
    this.config.set('ios', 'pageTransition', 'ios-transition');
  }


  public new_task() {
    this.navCtrl.push(NewTask);
  }

  public task_detail(task) {
    this.config.set('ios', 'pageTransition', 'md-transition');
    this.navCtrl.push(TaskDetail, { task: task });
  }

  public swipe_event(event) {
    if(event.direction == 2) {
      // 向左滑
      if(this.task_status_array.indexOf(this.task_status) == 0) {
        this.task_status = this.task_status_array[1];
      }
    }
    else if(event.direction == 4) {
      // 向右滑
      if(this.task_status_array.indexOf(this.task_status) == 1) {
        this.task_status = this.task_status_array[0];
      }
    }
  }

  public update_tasks_list(update_all: boolean) {
    return this.api.get_tasks(this._name_).then(
      (res) => {
        console.log(res);
        res.forEach((item) => {
          if(item.over)
            this.tasks_list_done.push(new Task(item));
          else
            this.tasks_list_not_done.push(new Task(item));
        })
      })
    .catch(() => this.native.show_toast("网络连接失败"));
  }

  public doRefresh(refresher) {
    this.currentPage = 0;
    this.hasNextPage = true;
    this.tasks_list_done = [];
    this.tasks_list_not_done = [];
    this.api.clean_cache(this._name_).then(() => {
      this.update_tasks_list(false).then(
        () => refresher.complete());    
    })
    setTimeout(() => refresher.complete(), 5000);
  }

}
