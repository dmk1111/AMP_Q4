import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthorizationService} from '../../services/authorization.service';
import {HttpClientModule} from '@angular/common/http';
import {authReducer} from '../../common/courses.reducer';
import {StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule,
        StoreModule.forRoot({ auth: authReducer })],
      declarations: [ LoginComponent ],
      providers: [AuthorizationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
