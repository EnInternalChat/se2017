import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChatList } from './chat-list';

@NgModule({
  declarations: [
    ChatList,
  ],
  imports: [
    IonicModule.forRoot(ChatList),
  ],
  exports: [
    ChatList
  ]
})
export class ChatListModule {}
