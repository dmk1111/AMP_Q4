import { Component, OnDestroy, OnInit } from "@angular/core";
import '../styles.css';
import { AuthorizationService } from './services/authorization.service';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  authorized: boolean;

  private subscription: Subscription;
  constructor(private authServ: AuthorizationService) {}

  ngOnInit() {
    this.authServ.checkAuth();
    this.isAuthorized();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isAuthorized(): void {
    this.subscription = this.authServ.isAuth()
      .subscribe(auth => this.authorized = auth);
  }
}
