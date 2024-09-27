import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      const token = localStorage.getItem('auth_token');
      this.isAuth.next(!!token);
    }
  }

  login(username: string, password: string) {
    if (username === 'user' && password === 'password') {
      localStorage.setItem('auth_token', 'mock_token');
      this.isAuth.next(true);
      return of(true);
    }
    this.isAuth.next(false);
    return of(false);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.isAuth.next(false);
    return of(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuth;
  }
}
