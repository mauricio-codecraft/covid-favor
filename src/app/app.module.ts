// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { ConfirmationPage } from './pages/confirmation/confirmation.page';
import { ActionsPage } from './pages/actions/actions.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { UserInfoPage } from './pages/user-info/user-info.page';
import { PaymentPage } from './pages/payment/payment.page';
import { CongratulationsPage } from './pages/congratulations/congratulations.page';
import { OfferPage } from './pages/offer/offer.page';
import { RequestPage } from './pages/request/request.page';
// components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { LoaderComponent } from './components/loader/loader.component';
// services
import { OnfidoAngularService } from './service/onfido.angular.service';
// material
import { MaterialModule } from './app.material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    ConfirmationPage,
    ActionsPage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    UserInfoPage,
    PaymentPage,
    CongratulationsPage,
    OfferPage,
    RequestPage,
    HeaderComponent,
    FooterComponent,
    CartComponent,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OnfidoAngularService,
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
