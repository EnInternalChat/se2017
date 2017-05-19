import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChatList } from './chat-list';
import { MyTimeFormat } from '../../providers/pipes';

@NgModule({
  declarations: [
    ChatList,
    MyTimeFormat
  ],
  imports: [
    IonicModule.forRoot(ChatList),
  ],
  exports: [
    ChatList
  ]
})
export class ChatListModule {}
