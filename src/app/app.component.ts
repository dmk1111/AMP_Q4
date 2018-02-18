import { Component, OnDestroy, OnInit } from '@angular/core';
import '../styles.css';
import { AuthorizationService } from './services/authorization.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  private subscription: Subscription;

  constructor(private authServ: AuthorizationService,
              private router: Router) {
  }

  ngOnInit() {
    this.authServ.checkAuth();
    this.isAuthorized();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isAuthorized(): void {
    this.subscription = this.authServ.isAuth()
      .subscribe(auth => {
        if (!auth) {
          this.router.navigate(['/login']);
        }
      });
  }
}
