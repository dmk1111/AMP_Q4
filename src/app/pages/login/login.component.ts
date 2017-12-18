import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private token = '';

  constructor(private authServ: AuthorizationService) { }

  ngOnInit() {
  }

  login(username: string, passwd: string) {
    this.token = window.btoa(passwd);
    this.authServ.logIn(username, this.token);
  }

}
