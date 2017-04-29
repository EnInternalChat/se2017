import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { BasisPage } from './basis-page';
import { TaskList } from '../task-list/task-list';
import { Personal } from '../personal/personal';
import { NotificationList } from '../notification-list/notification-list';

@NgModule({
  declarations: [
    BasisPage,
    TaskList,
    Personal,
    NotificationList
  ],
  imports: [
    IonicModule.forRoot(BasisPage),
  ],
  exports: [
    BasisPage,
    TaskList,
    Personal,
    NotificationList
  ]
})
export class BasisPageModule {}
