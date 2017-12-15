import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../authentication/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService : AuthService,
    private router : Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }
  
  checkLoggedIn(url : string) : boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
