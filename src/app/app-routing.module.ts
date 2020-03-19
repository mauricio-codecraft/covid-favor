import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';
import { ConfirmationPage } from './pages/confirmation/confirmation.page';
import { RolePage } from './pages/role/role.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { DeliveryOptionPage } from './pages/delivery-option/delivery-option.page';
import { UserInfoPage } from './pages/user-info/user-info.page';
import { PaymentPage } from './pages/payment/payment.page';
import { CongratulationsPage } from './pages/congratulations/congratulations.page';
import { SdkPage} from './pages/sdk/sdk.page';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPage },
  { path: 'confirmation', component: ConfirmationPage },
  { path: 'role', component: RolePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'delivery-option', component: DeliveryOptionPage },
  { path: 'user-info', component: UserInfoPage },
  { path: 'payment', component: PaymentPage },
  { path: 'congratulations', component: CongratulationsPage },
  { path: 'sdk', component: SdkPage }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
