import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let signedIn: any = localStorage.getItem('signedIn');
    if (signedIn == null) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}