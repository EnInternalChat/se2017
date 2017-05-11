import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { BasisPage } from '../pages/basis-page/basis-page';
import { ChatList } from '../pages/chat-list/chat-list';
import { TaskList } from '../pages/task-list/task-list';
import { TaskDetail } from '../pages/task-detail/task-detail';
import { NewTask } from '../pages/new-task/new-task';
import { Personal } from '../pages/personal/personal';
import { AvatorSelector } from '../pages/avator-selector/avator-selector';
import { NotificationList } from '../pages/notification-list/notification-list';
import { NotificationDetail } from '../pages/notification-detail/notification-detail';

import { NativeServiceHelper } from '../providers/native_service_helper';
import { HTTPService } from '../providers/http_helper';
import { MyTimeFormat } from '../providers/pipes';

@NgModule({
  declarations: [
    MyApp,
    Login,
    BasisPage,
    ChatList,
    TaskList,
    TaskDetail,
    NewTask,
    Personal,
    AvatorSelector,
    NotificationList,
    NotificationDetail,
    MyTimeFormat
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    BasisPage,
    ChatList,
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
  ]
})
export class AppModule {}
