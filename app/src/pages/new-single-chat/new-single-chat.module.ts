import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NewSingleChat } from './new-single-chat';

@NgModule({
  declarations: [
    NewSingleChat,
  ],
  imports: [
    IonicModule.forRoot(NewSingleChat),
  ],
  exports: [
    NewSingleChat
  ]
})
export class NewSingleChatModule {}
