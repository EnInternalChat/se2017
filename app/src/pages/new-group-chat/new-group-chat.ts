import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HTTPService } from '../../providers/http_helper';
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
  public company_name: string = "Google";
  public choose_index: number = -1;

  constructor(
    public changeDetect: ChangeDetectorRef,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HTTPService,
    public native: NativeServiceHelper) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewGroupChat');
    this.http.get("assets/data/sections.json", null).then(
      (data) => {
        this.root_section = new Section(data['section'], 0);
        this.sections.push(this.root_section);
        this.root_section.add_section(this.sections);
      });
  }

  public check_change(item: Section, index: number) {
    if(this.choose_index === -1 || index === this.choose_index) {
      if(!item.checked)
        this.choose_index = -1;
      else
        this.choose_index = index;
    }
    else {
      this.sections[this.choose_index].checked = false;
      this.sections[index].checked = true;
      this.choose_index = index;
      this.changeDetect.detectChanges();
    }
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
