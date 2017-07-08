import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { API } from '../../providers/api';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { Section } from '../../providers/section';

/**
 * Generated class for the NewGroupChat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-group-chat',
  templateUrl: 'new-group-chat.html',
})
export class NewGroupChat {
  public sections: Array<Section> = [];
  public root_section: Section;
  public choose_index: number = -1;

  constructor(
    public changeDetect: ChangeDetectorRef,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: API,
    public native: NativeServiceHelper) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewGroupChat');
    this.api.get_group_sections().then(
      (res) => {
        this.root_section = new Section(res, 0);
        this.sections.push(this.root_section);
        this.root_section.add_section(this.sections);
      })
  }

  public go_back() {
    this.navCtrl.pop();
  }

  public new_chat() {
    this.sections.forEach(
      (item) => {
        if(item.checked)
          console.log(item.name, ": ", item.checked);
      })
  }


}
