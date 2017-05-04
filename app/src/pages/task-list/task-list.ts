import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TaskDetail } from '../task-detail/task-detail';
import { NewTask } from '../new-task/new-task';
import { HTTPService } from '../../providers/http_helper';
import { Task } from '../../providers/task';
/**
 * Generated class for the TaskList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskList {

  task_status_array = ['tasks_not_done', 'tasks_done'];
  task_status : string = this.task_status_array[0];

  tasks_list_not_done : Array<Task> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public web_helper: HTTPService) {
    this.web_helper.get("assets/data/tasks.json", null).then(
      (res) => {
        for (let i = 0, n = res.length; i < n; i++) {
          this.tasks_list_not_done.push(new Task(res[i]));
        }
        console.log("list: ", this.tasks_list_not_done);
        this.task_detail(this.tasks_list_not_done[0]);
      });
    // this.new_task();
  }

  new_task() {
    this.navCtrl.push(NewTask);
  }

  task_detail(task) {
    this.navCtrl.push(TaskDetail, { task: task });
  }

  swipe_event(event) {
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

  // 再次返回页面或者初次进入页面时刷新列表数据
  ionViewWillEnter() {

  }  
}
