import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NotificationList } from './notification-list';

@NgModule({
  declarations: [
    NotificationList,
  ],
  imports: [
    IonicModule.forRoot(NotificationList),
  ],
  exports: [
    NotificationList
  ]
})
export class NotificationListModule {}
