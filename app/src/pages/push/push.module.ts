import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Push } from './push';

@NgModule({
  declarations: [
    Push,
  ],
  imports: [
    IonicModule.forRoot(Push),
  ],
  exports: [
    Push
  ]
})
export class PushModule {}
