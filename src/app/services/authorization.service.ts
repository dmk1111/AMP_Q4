import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class AuthorizationService {

  private auth: ReplaySubject<boolean>;

  constructor() {
    this.auth = new ReplaySubject<boolean>();
  }

  logIn(username: string, token: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    this.auth.next(true);
  }

  logOut(): void {
    localStorage.clear();
    this.auth.next(false);
  }

  isAuth(): ReplaySubject<boolean> {
    return this.auth;
  }

  checkAuth(): void {
    this.auth.next(!!localStorage.getItem('username'));
  }

  getUserInfo(): string {
    return localStorage.getItem('username');
  }

}
