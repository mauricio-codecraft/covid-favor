// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AmplifyService } from 'aws-amplify-angular';
// ionic
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// app
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// pages
import { LandingPage } from './pages/landing/landing.page';
import { ActionsPage } from './pages/actions/actions.page';
import { LoginPage } from './pages/login/login.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { UserInfoPage } from './pages/user-info/user-info.page';
import { OfferPage } from './pages/offer/offer.page';
import { RequestPage } from './pages/request/request.page';
// components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardFooterComponent } from './components/dashboard-footer/dashboard-footer.component';
import { LoaderComponent } from './components/loader/loader.component';
// services
// material
import { MaterialModule } from './app.material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    ActionsPage,
    LoginPage,
    DashboardPage,
    UserInfoPage,
    OfferPage,
    RequestPage,
    HeaderComponent,
    FooterComponent,
    DashboardFooterComponent,
    LoaderComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AmplifyService,
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
