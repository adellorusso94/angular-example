import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, NavigationExtras, CanLoad, Route } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true|UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true|UrlTree {
    return this.canActivate(route,state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    const checkLogin = this.checkLogin(url);

    if(checkLogin === true){
      return checkLogin;
    } else {
      return false;
    }
  }

  checkLogin(url: string): true|UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Create a dummy session id
    const sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: { sessionId: sessionId },
      fragment: 'anchor'
    }

    // Redirect to the login page
    return this.router.createUrlTree(['/login'], navigationExtras);
  }

}
