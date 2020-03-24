import { Component, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {Events} from '@ionic/angular';

import Amplify from 'aws-amplify';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild('loader', {static: false})
  loader: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('environment.aws = ', environment.aws)  // FIXME: remove
      let amplifyConfig = {
        Auth: {
          mandatorySignIn: true,
          region: environment.aws.cognito.REGION,
          userPoolId: environment.aws.cognito.USER_POOL_ID,
          identityPoolId: environment.aws.cognito.IDENTITY_POOL_ID,
          userPoolWebClientId: environment.aws.cognito.APP_CLIENT_ID
        },
        API: {
          endpoints: [
            {
              name: "covid-favor",
              endpoint: environment.aws.apiGateway.URL,
              region: environment.aws.apiGateway.REGION
            },
          ]
        }
      };
      console.log('amplifyConfig = ', amplifyConfig)  // FIXME: remove
      Amplify.configure(amplifyConfig);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.listenToLoadingEvents();
  }

  listenToLoadingEvents() {
    this.events.subscribe('loading:start', () => {
      console.log("loading:start");
      this.loader.show = true
    });
    this.events.subscribe('loading:stop', () => {
      console.log("loading:stop")
      this.loader.show = false
    });
  }
}
