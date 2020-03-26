import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';
import { ActionsPage } from './pages/actions/actions.page';
import { LoginPage } from './pages/login/login.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { UserInfoPage } from './pages/user-info/user-info.page';
import { OfferPage } from './pages/offer/offer.page';
import { RequestPage } from './pages/request/request.page';
import { AuthGuard } from './guard/authguard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPage },
  { path: 'actions', component: ActionsPage, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: DashboardPage, canActivate: [AuthGuard] },
  { path: 'user-info', component: UserInfoPage },
  { path: 'offer', component: OfferPage, canActivate: [AuthGuard] },
  { path: 'request', component: RequestPage, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
