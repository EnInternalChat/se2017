import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NewTask } from './new-task';

@NgModule({
  declarations: [
    NewTask,
  ],
  imports: [
    IonicModule.forRoot(NewTask),
  ],
  exports: [
    NewTask
  ]
})
export class NewTaskModule {}
