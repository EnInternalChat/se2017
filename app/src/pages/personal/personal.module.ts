import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Personal } from './personal';

@NgModule({
  declarations: [
    Personal,
  ],
  imports: [
    IonicModule.forRoot(Personal),
  ],
  exports: [
    Personal
  ]
})
export class PersonalModule {}
