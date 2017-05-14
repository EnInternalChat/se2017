import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NewGroupChat } from './new-group-chat';

@NgModule({
  declarations: [
    NewGroupChat,
  ],
  imports: [
    IonicModule.forRoot(NewGroupChat),
  ],
  exports: [
    NewGroupChat
  ]
})
export class NewGroupChatModule {}
