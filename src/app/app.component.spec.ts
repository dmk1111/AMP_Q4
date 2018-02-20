// TODO: fix router issues in unit test:
// https://codecraft.tv/courses/angular/unit-testing/routing/
// https://stackblitz.com/angular/jeeoonxljln

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {APP_BASE_HREF, UpperCasePipe} from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import {AuthorizationService} from './services/authorization.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {CoursesService} from './services/courses.service';
import {ICourseDetails} from './app.interfaces';
import {Component, Directive, NO_ERRORS_SCHEMA} from '@angular/core';

const course: ICourseDetails = {
  id: 8693,
  type: 'Video',
  name: 'duis mollit reprehenderit ad',
  description: 'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa laborum cillum.',
  isTopRated: true,
  date: '2017-09-28T04:39:24+00:00',
  authors: [
    {
      id: 1370,
      firstName: 'Polly',
      lastName: 'Sosa'
    }
  ],
  length: 157
};

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }

  navigate(url: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}

class AuthServiceStub {
  isAuth(): Observable<boolean> {
    return Observable.of(true);
  }
}

class CoursesServiceStub {
  getCoursesList(): Observable<ICourseDetails[]> {
  return Observable.of([course]);
  }
}

@Component({
  selector : `mock-component`,
  template :
    `<div>Mock component</div>`
})
export class MockComponent {
}

@Directive ({
  // tslint:disable-next-line
  selector: `[routerLink], [routerLinkActive]`
})
class DummyRouterLinkDirective {}



xdescribe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        MockComponent,
        DummyRouterLinkDirective,
      ],
      providers: [
        UpperCasePipe,
        {provide: Router, useClass: RouterStub},
        {provide: AuthorizationService, useClass: AuthServiceStub},
        {provide: CoursesService, useClass: CoursesServiceStub},
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
      imports: [ RouterTestingModule.withRoutes([
          { path: 'courses', component: MockComponent },
        ]),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  it(`should have as title 'app'`, () => {
    expect(app.title).toEqual('app');
  });
  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  });
});
