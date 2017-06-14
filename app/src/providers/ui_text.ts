import { Injectable } from '@angular/core';

export const enum AppLanguage {
  CN = 1,
  EN = 2
}

@Injectable()
export class UIText {

  private data = {
    "CN": 
    {
      "loading": "请稍候...",
      "pullText": "下拉刷新",
      "refreshText": "刷新中...",
      "LoginPage":
      {
        "username": "用户名",
        "pwd": "密码",
        "remember_pwd": "记住密码",
        "auto_login": "自动登录",
        "login_submit": "登 录"
      },
      "PersonalPage":
      {
        "title": "账户设置",
        "avator": "点击修改头像",
        "username": "用户名",
        "position": "职位",
        "gender": "性别",
        "language": "系统语言",
        "notice": "开启通知栏提醒",
        "change_pwd": "修改密码",
        "old_pwd": "旧密码",
        "new_pwd": "新密码",
        "check_pwd": "确认密码",
        "change_contact": "修改联系方式",
        "tel": "电话号码",
        "mail": "邮箱",
        "ok": "确认",
        "cancel": "取消"
      },
      "BasisPage":
      {
        "chat": "聊天管理",
        "chat_toast": "获取聊天列表失败",
        "task": "任务管理",
        "notice": "通知管理",
        "personal": "账户设置"
      },
      "ChatDetailPage":
      {
        "start_fail": "无法开始会话",
        "send_text_fail": "发送文字信息失败，请检查网络",
        "send_img_fail": "发送图片信息失败，请检查网络"
      }

    },
    "EN":
    {
      "loading": "Waiting...",
      "pullText": "Pull To Refresh",
      "refreshText": "Refreshing...",
      "LoginPage":
      {
        "username": "Username",
        "pwd": "Password",
        "remember_pwd": "Remember me",
        "auto_login": "Auto login",
        "login_submit": "Login"            
      },
      "PersonalPage":
      {
        "title": "Settings",
        "avator": "Change avator",
        "username": "Username",
        "position": "Position",
        "gender": "Gender",
        "language": "Language",
        "notice": "Notification",
        "change_pwd": "Change password",
        "old_pwd": "old password",
        "new_pwd": "new password",
        "check_pwd": "new password",
        "change_contact": "Change contact",
        "tel": "telephone",
        "mail": "mail",        
        "ok": "OK",
        "cancel": "Cancel"
      },
      "BasisPage":
      {
        "chat": "Chat List",
        "chat_toast": "Can not get chat data",
        "task": "Task List",
        "notice": "Notice List",
        "personal": "Setting"
      },
      "ChatDetailPage":
      {
        "start_fail": "Can not start chat"
      }

    }
  };

  public loading: string;
  public Login: any;
  public BasisPage: any;
  public ChatDetailPage: any;
  public PersonalPage: any;
  public LanguageOptions = [
    {"value": AppLanguage.CN, "text": "简体中文"},
    {"value": AppLanguage.EN, "text": "English"}];

  constructor() {
    this.update_language(AppLanguage.CN);
  }

  public language2key(lan: AppLanguage): string {
    switch (Number(lan)) {
      case AppLanguage.CN:
        return "CN";
      case AppLanguage.EN:
        return "EN";
      default:
        return "CN";
    }
  }

  public update_language(language: AppLanguage) {
    if(this.data == null) {
      return;
    }
    let data_lan = this.data[this.language2key(language)];
    if(data_lan == null)
      return;
    this.loading = data_lan.loading;
    this.Login = data_lan.LoginPage;
    this.BasisPage = data_lan.BasisPage;
    this.ChatDetailPage = data_lan.ChatDetailPage;
    this.PersonalPage = data_lan.PersonalPage;

  }

}