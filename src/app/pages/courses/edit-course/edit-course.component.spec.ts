import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseComponent } from './edit-course.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DurationPipe} from '../../../pipes/duration.pipe';
import {SearchPipe} from '../../../pipes/search.pipe';
import {NgModule} from '@angular/core';
import {OrderByPipe} from '../../../pipes/order-by.pipe';
import {AuthorsComponent} from '../../../common/controls/authors/authors.component';
import {HttpClientModule} from '@angular/common/http';
import {CoursesService} from '../../../services/courses.service';
import {RouterTestingModule} from '@angular/router/testing';

@NgModule({
  imports: [HttpClientModule, RouterTestingModule],
  declarations: [
    DurationPipe,
    OrderByPipe,
    SearchPipe,
  ],
  providers: [
    DurationPipe,
    CoursesService
  ],
  exports: [
    DurationPipe,
    OrderByPipe,
    SearchPipe]
})

export class ReusedFeatureModule { }

describe('EditCourseComponent', () => {
  let component: EditCourseComponent;
  let fixture: ComponentFixture<EditCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ReusedFeatureModule
      ],
      declarations: [ EditCourseComponent, AuthorsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
