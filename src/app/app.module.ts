import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Mixpanel, MixpanelPeople } from '@ionic-native/mixpanel';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CountdownComponent, CountdownPipe, TimeToTriviaPipe, TriviaHourPipe } from '../pages/home/countdown.component';
import { TwitterWidgetComponent } from '../pages/home/twitter-widget.component';
import { TeamScorePage } from '../pages/scores/team';
import { AuthComponent } from '../pages/auth/auth';
import { RulesPage } from '../pages/rules/rules';
import { ScoresPage } from '../pages/scores/scores';
import { SentryErrorHandler } from '../services/error';
import { OrdinalPipe } from '../pipes/ordinal.pipe';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'ee03ee3c'
  },
  'push': {
    'sender_id': '100362448228',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#47274C'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    TeamScorePage,
    RulesPage,
    ScoresPage,
    CountdownComponent,
    TimeToTriviaPipe,
    TriviaHourPipe,
    CountdownPipe,
    TwitterWidgetComponent,
    AuthComponent,
    OrdinalPipe,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    TeamScorePage,
    RulesPage,
    ScoresPage,
  ],
  providers: [{provide: ErrorHandler, useClass: SentryErrorHandler}, Mixpanel, MixpanelPeople]
})
export class AppModule {}
