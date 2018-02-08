import { Component, OnDestroy, OnInit } from "@angular/core";
import {AuthorizationService} from '../../services/authorization.service';
import { Subscription } from "rxjs/Subscription";
import {CoursesService} from '../../services/courses.service';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  placeholder: string = 'user login';
  username: string;
  authorized: boolean;
  editing: boolean = false;
  courseInfo: string = '';

  private subscription: Subscription;

  constructor(private authServ: AuthorizationService,
              private courseServ: CoursesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.isAuthorized();
    this.courseServ.isEditingCourse()
      .subscribe( editing => {
        this.editing = editing;
      });
    this.activatedRoute.params.subscribe( params => {
      console.log(params);
    });
    this.router.events.subscribe( event => {
      if (event instanceof ActivationEnd && event.snapshot.children[0] !== undefined) {
        if (event.snapshot.children[0].routeConfig.path === 'new') {
          this.courseInfo = 'Create New Course';
        } else {
          this.courseInfo = ` Course ${event.snapshot.children[0].params['id']}`;
        }
      }
    });
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
        this.username = '';
        this.authorized = false;
        });
  }

  coursesClick() {
    this.courseServ.editCourse(false);
  }
}
