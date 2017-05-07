import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NotificationList } from './notification-list';
import { MyTimeFormat } from '../../providers/pipes';

@NgModule({
  declarations: [
    NotificationList,
    MyTimeFormat
  ],
  imports: [
    IonicModule.forRoot(NotificationList),
  ],
  exports: [
    NotificationList
  ]
})
export class NotificationListModule {}
