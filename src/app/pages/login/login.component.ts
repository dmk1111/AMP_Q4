import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authServ: AuthorizationService) { }

  ngOnInit() {
  }

  login(username: string, passwd: string) {
    this.authServ.logIn(username, passwd);
  }

}
