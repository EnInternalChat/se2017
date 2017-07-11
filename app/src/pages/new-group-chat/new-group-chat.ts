import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { API } from '../../providers/api';
import { NativeServiceHelper } from '../../providers/native_service_helper';
import { Section } from '../../providers/section';
import { UIText } from '../../providers/ui_text';
import { AppGlobal } from '../../providers/global_data';
import { ChatDetail } from '../chat-detail/chat-detail';
import { Conversation } from '../../providers/chat';

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
    public native: NativeServiceHelper,
    public ui: UIText,
    public global_data: AppGlobal) {
  }

  ionViewDidLoad() {
    this.native.loading();
    this.api.get_group_sections().then(
      (res) => {
        this.root_section = new Section(res, 0);
        this.sections.push(this.root_section);
        this.root_section.add_section(this.sections);
        this.native.stop_loading();
      })
  }

  public go_back() {
    this.navCtrl.pop();
  }

  public new_chat() {
    let group = [];
    this.sections.forEach(
      (item) => {
        if(item.checked)
          group.push(item.id);
      });
    this.native.loading()
    this.api.start_group_chat(group).then((res) => {
      this.native.stop_loading();
      if(res.body.chatID === -1) {
        this.native.show_toast('无法开启群组聊天');
        return;
      }
      let con_id = res.body.chatID;

      let new_con = new Conversation({
        type: 'group',
        targetInfo: {
          groupID: con_id,
          groupName: con_id
        },
        latestType: 'text',
        unReadMsgCnt: 0,
        lastMsgDate: new Date().toString()
      });
      new_con.last_text = "";
      this.navCtrl.pop();
      this.navCtrl.push(ChatDetail, {conversation: new_con});
    })
  }


}
