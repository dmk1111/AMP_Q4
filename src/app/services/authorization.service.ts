import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthorizationService {

  private auth: boolean;

  constructor() { }

  logIn(username: string, token: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    this.auth = true;
  }

  logOut(): void {
    localStorage.clear();
    this.auth = false;
  }

  isAuth(): Observable<boolean> {
    return new Observable( observer => {
      setInterval(() => {
        observer.next(this.auth);
      }, 500);
    });
  }

  getUserInfo(): string {
    this.auth = !!localStorage.getItem('username');
    return localStorage.getItem('username');
  }

}
