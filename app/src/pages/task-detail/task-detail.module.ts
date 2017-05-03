import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TaskDetail } from './task-detail';

@NgModule({
  declarations: [
    TaskDetail,
  ],
  imports: [
    IonicModule.forRoot(TaskDetail),
  ],
  exports: [
    TaskDetail
  ]
})
export class TaskDetailModule {}
