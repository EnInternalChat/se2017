import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { BasisPage } from './basis-page';
import { ChatList } from '../chat-list/chat-list';
import { TaskList } from '../task-list/task-list';
import { Personal } from '../personal/personal';
import { NotificationList } from '../notification-list/notification-list';

@NgModule({
  declarations: [
    BasisPage,
    ChatList,
    TaskList,
    Personal,
    NotificationList
  ],
  imports: [
    IonicModule.forRoot(BasisPage),
  ],
  exports: [
    BasisPage,
    ChatList,
    TaskList,
    Personal,
    NotificationList
  ]
})
export class BasisPageModule {}
