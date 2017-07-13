import { Injectable } from '@angular/core';
import { Platform, ToastController, LoadingController, Loading } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { UIText } from './ui_text';

@Injectable()
export class NativeServiceHelper {
  public is_offline: boolean = false;
  public is_platform: boolean;
  private load: Loading;
  private camera_options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };   
  private image_picker_option: ImagePickerOptions = {
    maximumImagesCount: 1,
    quality: 20
  };

  constructor(
    private platform: Platform, 
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private ui: UIText) {
    if(this.platform.is('android') || this.platform.is('ios'))
      this.is_platform = true;
    else
      this.is_platform = false;
  }

  public take_photo() {
    if(!this.is_platform)
      return;
    return this.camera.getPicture(this.camera_options);
  }

  public pick_image() {
    if(!this.is_platform)
      return;
    return this.imagePicker.getPictures(this.image_picker_option);
  }

  public show_toast(words: string, time: number = 2000, pos: string = 'bottom'): void {
      if(pos != "bottom" && pos != "top")
          return;
      this.toastCtrl.create({
          message: words,
          duration: time,
          position: pos,
      }).present();
  }

  public loading(message ?: string) {
    if(message == null)
      message = this.ui.loading;
    if(this.load != null) {
      return;
    }
    this.load = this.loadCtrl.create({ content: message });
    this.load.present();
    setTimeout(() => this.stop_loading(), 20000);
  }

  public stop_loading() {
    if(this.load == null)
      return;
    else {
      this.load.dismiss();
      this.load = null;
    }
  }
}