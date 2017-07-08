import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, Config, Events } from 'ionic-angular';

import { TaskDetail } from '../task-detail/task-detail';
import { NewTask } from '../new-task/new-task';
import { HTTPService } from '../../providers/http_helper';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { Task } from '../../providers/task';
import { AppGlobal } from '../../providers/global_data';

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
              public web_helper: HTTPService,
              public native: NativeServiceHelper,
              public global_data: AppGlobal) {
  }

  ionViewDidLoad() {
    if(!this.navParams.get('need_load')) {
      this.copy_list(this.global_data.task_cache['list_not_done'], this.tasks_list_not_done);
      this.copy_list(this.global_data.task_cache['list_done'], this.tasks_list_done);
      return;
    }
    this.currentPage = 0;
    this.hasNextPage = true;
    this.tasks_list_not_done = [];
    this.tasks_list_done = [];
    this.native.loading("请稍候...");
    this.loadList("tasks_not_done").then(
      () => this.native.stop_loading());
  }

  ionViewWillUnload() {
    this.global_data.task_cache['list_not_done'] = [];
    this.global_data.task_cache['list_done'] = [];
    this.copy_list(this.tasks_list_not_done, this.global_data.task_cache['list_not_done']);
    this.copy_list(this.tasks_list_done, this.global_data.task_cache['list_done']);
  }

  ionViewDidEnter() {
    this.config.set('ios', 'pageTransition', 'ios-transition');    
  }

  public copy_list(source, dst) {
    source.forEach((item) => {
      dst.push(item);
    });
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


  public loadList(which_list: string): Promise<any> {
    return this.web_helper.get("assets/data/tasks.json", null).then(
      (res) => {
        this.hasNextPage = (res.length >= this.limit);
        if(this.hasNextPage)
          this.currentPage++;
        for (let i = 0, n = res.length; i < n; i++) {
          let new_task = new Task(res[i]);
          if(new_task.over)
            this.tasks_list_done.push(new_task);
          else
            this.tasks_list_not_done.push(new_task);
        }
        console.log("list_not_done: ", this.tasks_list_not_done);
        console.log("list_done: ", this.tasks_list_done);
        return true;
      },
      (error) => this.native.show_toast("网络连接异常！"));

  }

  public doRefresh(refresher) {
    this.currentPage = 0;
    this.hasNextPage = true;
    this.tasks_list_done = [];
    this.tasks_list_not_done = [];
    this.loadList("tasks_not_done").then(
      () => refresher.complete());
    setTimeout(() => refresher.complete(), 10000);
  }

  public loadMore(infiniteScroll) {
    if(!this.hasNextPage) {
      infiniteScroll.complete();
      return;
    }
    this.loadList("tasks_not_done").then(
      () => infiniteScroll.complete());
  }

}
