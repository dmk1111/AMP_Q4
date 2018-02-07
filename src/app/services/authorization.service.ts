import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/debounceTime';
import {Router} from '@angular/router';

@Injectable()
export class AuthorizationService {

  private auth: ReplaySubject<boolean>;
  private baseUrl: string;
  private userInfo: any = {};

  constructor(private http: HttpClient, private router: Router) {
    this.auth = new ReplaySubject<boolean>();
    this.baseUrl = 'http://localhost:3004';
  }

  logIn(username: string, password: string): void {
    const body = {
      login: username,
      password: password
    };
    const url = `${this.baseUrl}/auth/login`;

    this.http.post(url, body)
      .subscribe((data: { token: string }) => {
          localStorage.setItem('username', username);
          localStorage.setItem('token', data.token);
          this.auth.next(true);
          this.router.navigate(['/courses']);
        },
        err => {
          this.auth.next(false);
        });
  }

  logOut(): void {
    localStorage.clear();
    this.auth.next(false);
    this.router.navigate(['/login']);
  }

  isAuth(): ReplaySubject<boolean> {
    const body = {
      login: localStorage.getItem('username')
    };
    const url = `${this.baseUrl}/auth/userinfo`;
    const options = {
      headers: new HttpHeaders({'Authorization': `${localStorage.getItem('token')}`}),
    };

    this.http.post(url, body, options)
      .debounceTime(500)
      .subscribe((data) => {
          this.userInfo = data;
          this.auth.next(true);
        },
        err => {
          this.userInfo = {};
          this.auth.next(false);
        });
    return this.auth;
  }

  checkAuth(): void {
    this.auth.next(!!localStorage.getItem('username'));
  }

  getUserInfo(): string {
    return this.userInfo.login;
  }

}
