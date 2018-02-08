import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private authServ: AuthorizationService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.authServ.isAuth()
      .subscribe(auth => {
        if (auth) {
          this.router.navigate(['/courses']);
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  login(username: string, passwd: string) {
    this.authServ.logIn(username, passwd);
  }

}
