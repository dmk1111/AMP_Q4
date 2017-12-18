import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public placeholder = 'user login';
  public username: string;
  authorized: boolean;

  constructor(public authServ: AuthorizationService) {
  }

  ngOnInit() {
    this.isAuthorized();
  }

  logOff() {
    this.authServ.logOut();
    console.log('Logged out');
  }

  isAuthorized(): void {
    this.authServ.isAuth()
      .subscribe(auth => {
        this.username = this.authServ.getUserInfo();
        return this.authorized = auth;
      });
  }

}
