import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@shared/services/auth/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/login'], {
            queryParams: { returnUrl: state.url },
          });
        }
      })
    );
  }
}
