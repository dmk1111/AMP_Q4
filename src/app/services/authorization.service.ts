import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/debounceTime';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LOG_IN, LOG_OUT, RESET } from '../common/courses.actions';
import { Observable } from 'rxjs/Observable';

interface AuthStore {
  auth: boolean;
}

@Injectable()
export class AuthorizationService {

  // private auth: ReplaySubject<boolean>;
  private auth: Observable<boolean>;
  private baseUrl: string;
  private userInfo: any = {};

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<AuthStore>) {
    // this.auth = new ReplaySubject<boolean>();
    this.auth = this.store.pipe(select('auth'));
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
          // this.auth.next(true);
          this.store.dispatch({ type: LOG_IN });
          this.router.navigate(['/courses']);
        },
        err => {
          // this.auth.next(false);
          this.store.dispatch({ type: RESET });
        });
  }

  logOut(): void {
    localStorage.clear();
    // this.auth.next(false);
    this.store.dispatch({ type: LOG_OUT });
    this.router.navigate(['/login']);
  }

  isAuth(): /* ReplaySubject<boolean> */ Observable<boolean> {
    const body = {
      login: localStorage.getItem('username')
    };
    const url = `${this.baseUrl}/auth/userinfo`;
    const options = {
      headers: new HttpHeaders({ 'Authorization': `${localStorage.getItem('token')}` }),
    };

    this.http.post(url, body, options)
      .debounceTime(500)
      .subscribe((data) => {
          this.userInfo = data;
          // this.auth.next(true);
          this.store.dispatch({ type: LOG_IN });
        },
        err => {
          this.userInfo = {};
          // this.auth.next(false);
          this.store.dispatch({ type: RESET });
        });
    return this.auth;
  }

  checkAuth(): void {
    // this.auth.next(!!localStorage.getItem('username'));
    if (!!localStorage.getItem('username')) {
      this.store.dispatch({ type: LOG_IN });
    } else {
      this.store.dispatch({ type: RESET });
    }
  }

  getUserInfo(): string {
    return this.userInfo.login;
  }

}
