import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChatDetail } from './chat-detail';

@NgModule({
  declarations: [
    ChatDetail,
  ],
  imports: [
    IonicModule.forRoot(ChatDetail),
  ],
  exports: [
    ChatDetail
  ]
})
export class ChatDetailModule {}
