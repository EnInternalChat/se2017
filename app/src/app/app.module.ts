import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { BasisPage } from '../pages/basis-page/basis-page';
import { ChatList } from '../pages/chat-list/chat-list';
import { ChatDetail } from '../pages/chat-detail/chat-detail';
import { NewGroupChat } from '../pages/new-group-chat/new-group-chat';
import { NewSingleChat } from '../pages/new-single-chat/new-single-chat';
import { TaskList } from '../pages/task-list/task-list';
import { TaskDetail } from '../pages/task-detail/task-detail';
import { NewTask } from '../pages/new-task/new-task';
import { Personal } from '../pages/personal/personal';
import { AvatorSelector } from '../pages/avator-selector/avator-selector';
import { NotificationList } from '../pages/notification-list/notification-list';
import { NotificationDetail } from '../pages/notification-detail/notification-detail';

import { NativeServiceHelper } from '../providers/native_service_helper';
import { HTTPService } from '../providers/http_helper';
import { ChatService } from '../providers/chats_service';
import { StorageHelper } from '../providers/storage_helper';
import { MD5 } from '../providers/secure_md5';
import { AppGlobal } from '../providers/global_data';
import { UIText } from '../providers/ui_text'; 
import { MyTimeFormat, MarkDownParser, MessageTimeFormat } from '../providers/pipes';

import { SharedModule } from '../components/shared.module';

@NgModule({
  declarations: [
    MyApp,
    Login,
    BasisPage,
    ChatList,
    ChatDetail,
    NewGroupChat,
    NewSingleChat,
    TaskList,
    TaskDetail,
    NewTask,
    Personal,
    AvatorSelector,
    NotificationList,
    NotificationDetail,
    MyTimeFormat,
    MarkDownParser,
    MessageTimeFormat
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp, {
        swipeBackEnabled: false
    }),
    IonicStorageModule.forRoot({
      name: 'chat__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpModule,
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    BasisPage,
    ChatList,
    ChatDetail,
    NewSingleChat,
    NewGroupChat,
    TaskList,
    TaskDetail,
    NewTask,
    Personal,
    AvatorSelector,
    NotificationList,
    NotificationDetail
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeServiceHelper,
    HTTPService,
    StorageHelper,
    ImagePicker,
    Camera,
    AppGlobal,
    UIText,
    MD5,
    ChatService
  ]
})
export class AppModule {}
