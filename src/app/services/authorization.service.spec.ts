import { TestBed, inject } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule} from '@ngrx/store';
import {authReducer} from '../common/courses.reducer';

describe('AuthorizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule,
        StoreModule.forRoot({ auth: authReducer })],
      providers: [AuthorizationService]
    });
  });

  it('should be created', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));
});
