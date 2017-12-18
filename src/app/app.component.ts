import { Component, OnInit } from '@angular/core';
import '../styles.css';
import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  authorized: boolean;
  constructor(private authServ: AuthorizationService) {}

  ngOnInit() {
    this.authServ.getUserInfo();
    this.isAuthorized();
  }

  isAuthorized(): void {
    this.authServ.isAuth()
      .subscribe(auth => this.authorized = auth);
  }
}
