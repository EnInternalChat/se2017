import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImageViwer component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'image-viwer',
  templateUrl: 'image-viwer.html'
})
export class ImageViwer {

  public image_url: string;
  // public tab_bar: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.image_url = this.navParams.get('image_url');
    // hide tabbar
    // this.tab_bar = document.querySelector('#basis_tabs .tabbar');
    // this.tab_bar.style.display = 'none';
  }

  ionViewWillUnload() {
    // this.tab_bar.style.display = 'flex';
  }

  exit() {
    this.navCtrl.pop();
  }

}
