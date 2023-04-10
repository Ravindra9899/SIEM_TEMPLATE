import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = this.authService.getUserRole();

    console.log('userRole');
    console.log(userRole);


    switch (userRole) {
      case 'admin':
        return true;

      case 'user':
        const allowedRoutes = ['dashboard', 'charts', 'login', 'scan'];
        const currentRoute = this.router.url.split('/')[1];

        console.log(currentRoute);

        console.log(allowedRoutes.includes(currentRoute));
        if (allowedRoutes.includes(currentRoute)) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }

      case 'guest':
        const allowedRoutesGuest = ['charts', 'login'];
        const currentRouteGuest = this.router.url.split('/')[1];

        console.log('guest role', allowedRoutesGuest.includes(currentRouteGuest))

        if (allowedRoutesGuest.includes(currentRouteGuest)) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }

      default:
        const allowedRoutesDefault = ['charts', 'login'];
        const currentRouteDefault = this.router.url.split('/')[1];

        if (allowedRoutesDefault.includes(currentRouteDefault)) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
    }
  }
}
