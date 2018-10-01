import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, ViewChild } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';

import { CourseDetailsComponent } from './course-details.component';
import { DurationPipe } from '../../../pipes/duration.pipe';
import { ICourseDetails } from '../../../app.interfaces';
import { PlateBorderDirective } from '../../../directives/plate-border.directive';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }

  navigate(url: string) {
    return url;
  }
}

describe('CourseDetailsComponent', () => {
  let component: CourseDetailsComponent;
  let fixture: ComponentFixture<CourseDetailsComponent>;
  const oldCourse: ICourseDetails = {
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

  const newCourse: ICourseDetails = {
      id: 4980,
      type: 'Webinar',
      name: 'magna excepteur aute deserunt',
      description: 'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Duis incididunt culpa aliqua ea Lorem tempor.',
      isTopRated: false,
      date: '2016-05-31T02:02:36+00:00',
      authors: [
        {
          'id': 8413,
          'firstName': 'Greta',
          'lastName': 'Richardson'
        },
        {
          'id': 7458,
          'firstName': 'Deana',
          'lastName': 'Bruce'
        },
        {
          'id': 5508,
          'firstName': 'Patsy',
          'lastName': 'Bright'
        }
      ],
      length: 207
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseDetailsComponent,
        DurationPipe,
        PlateBorderDirective
      ],
      providers: [
        UpperCasePipe,
        {provide: Router, useClass: RouterStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsComponent);
    component = fixture.componentInstance;
    component.course = oldCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have correct properties', () => {
    component.ngOnChanges();
    expect(component.id).toEqual(oldCourse.id);
    expect(component.date).toEqual(new Date(oldCourse.date));
    expect(component.description).toEqual(oldCourse.description);
    expect(component.type).toEqual('VIDEO');
    expect(component.length).toEqual(oldCourse.length);
  });
  it('should trigger editing', () => {
    const editSpy = spyOn(component, 'editCourse').and.callFake(() => console.log('editTriggered'));
    const editButton: DebugElement = fixture.debugElement.query(By.css('.edit'));
    editButton.triggerEventHandler('click', null);
    expect(editSpy).toHaveBeenCalled();
  });
  it('should trigger delete', () => {
    const deleteSpy = spyOn(component, 'deleteCourse').and.callFake(() => console.log('deleteTriggered'));
    const deleteButton: DebugElement = fixture.debugElement.query(By.css('.delete'));
    deleteButton.triggerEventHandler('click', null);
    expect(deleteSpy).toHaveBeenCalled();
  });
  it('should trigger onChanges hook when data updated', () => {
    component.course = newCourse;
    const spy = spyOn(component, 'ngOnChanges');
    fixture.detectChanges();
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
  });
});
