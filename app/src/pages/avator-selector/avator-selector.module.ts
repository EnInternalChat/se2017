import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AvatorSelector } from './avator-selector';

@NgModule({
  declarations: [
    AvatorSelector,
  ],
  imports: [
    IonicModule.forRoot(AvatorSelector),
  ],
  exports: [
    AvatorSelector
  ]
})
export class AvatorSelectorModule {}
