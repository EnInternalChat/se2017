import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NotificationDetail } from './notification-detail';

@NgModule({
  declarations: [
    NotificationDetail,
  ],
  imports: [
    IonicModule.forRoot(NotificationDetail),
  ],
  exports: [
    NotificationDetail
  ]
})
export class NotificationDetailModule {}
