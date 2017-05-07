import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TaskList } from './task-list';

import { MyTimeFormat } from '../../providers/pipes';

@NgModule({
  declarations: [
    TaskList,
    MyTimeFormat
  ],
  imports: [
    IonicModule.forRoot(TaskList),
  ],
  exports: [
    TaskList
  ]
})
export class TaskListModule {}
