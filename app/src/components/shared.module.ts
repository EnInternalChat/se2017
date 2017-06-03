import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ImageViwer } from './image-viwer/image-viwer';

@NgModule({
  imports: [IonicModule],
  declarations: [ImageViwer],
  exports: [ImageViwer],
  entryComponents: [ImageViwer],
  providers: []
})
export class SharedModule {
}
