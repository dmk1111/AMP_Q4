import { Component, OnDestroy, OnInit } from "@angular/core";
import {AuthorizationService} from '../../services/authorization.service';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public placeholder = 'user login';
  public username: string;
  authorized: boolean;

  private subscription: Subscription;

  constructor(private authServ: AuthorizationService) {
  }

  ngOnInit() {
    this.isAuthorized();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logOff() {
    this.authServ.logOut();
    console.log('Logged out');
  }

  isAuthorized(): void {
    this.subscription = this.authServ.isAuth()
      .subscribe(auth => {
        this.username = this.authServ.getUserInfo();
        this.authorized = auth;
      },
        err => {
        this.username = "";
        this.authorized = false
        });
  }

}
