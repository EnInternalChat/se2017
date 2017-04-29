import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TaskList } from './task-list';

@NgModule({
  declarations: [
    TaskList,
  ],
  imports: [
    IonicModule.forRoot(TaskList),
  ],
  exports: [
    TaskList
  ]
})
export class TaskListModule {}
