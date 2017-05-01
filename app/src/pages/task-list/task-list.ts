import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NewTask } from '../new-task/new-task';
import { HTTPService } from '../../providers/http_helper';
import { Task } from './task';
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

  tasks_list_not_done : Array<Task>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public web_helper: HTTPService) {
    this.web_helper.get("assets/data/tasks.json", null).then(
      (res) => {
        this.tasks_list_not_done = res;
        console.log(this.tasks_list_not_done);
      });
    this.new_task();
  }

  new_task() {
    this.navCtrl.push(NewTask);
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
}
