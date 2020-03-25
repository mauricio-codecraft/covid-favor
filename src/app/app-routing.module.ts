import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';
import { ActionsPage } from './pages/actions/actions.page';
import { LoginPage } from './pages/login/login.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { UserInfoPage } from './pages/user-info/user-info.page';
import { OfferPage } from './pages/offer/offer.page';
import { RequestPage } from './pages/request/request.page';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPage },
  { path: 'actions', component: ActionsPage },
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: DashboardPage },
  { path: 'user-info', component: UserInfoPage },
  { path: 'offer', component: OfferPage },
  { path: 'request', component: RequestPage }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
