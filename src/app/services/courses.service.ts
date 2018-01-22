import { Injectable } from '@angular/core';
import { ICourseDetails } from '../pages/courses/course-details/course-details.interface';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class CoursesService {

  private courses: ICourseDetails[] = [];
  private editing: ReplaySubject<boolean>;

  constructor() {
    this.editing = new ReplaySubject<boolean>();
    this.courses = [
      {
        courseDate: 'Fri Dec 29 2017 17:40:51 GMT+0200 (EET)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        type: 'Webinar',
        duration: 95,
        topRated: true,
      },
      {
        courseDate: 'Sat Dec 02 2017 17:40:51 GMT+0200 (EET)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        type: 'Video',
        duration: 88,
      },
      {
        courseDate: 'Fri Dec 15 2017 17:40:51 GMT+0200 (EET)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        type: 'Video',
        duration: 15,
        topRated: true,
      },
      {
        courseDate: 'Mon Dec 25 2017 17:45:51 GMT+0200 (EET)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        type: 'Video',
        duration: 135,
      }
    ];
  }

  getList(): Observable<ICourseDetails> {
    return Observable.from(this.courses);
  }

  getItem(id: number): ICourseDetails {
    return this.courses[id];
  }

  updateItem(id: number, course: ICourseDetails): void {
    this.courses[id] = course;
  }

  removeItem(item: ICourseDetails): void {
    const id = this.courses.findIndex(function (element) {
      return element === item;
    });
    this.courses.splice(id, 1);
  }

  createCourse(course: ICourseDetails): void {
    this.courses.push(course);
  }

  editCourse(edit: boolean) {
    this.editing.next(edit);
  }

  isEditingCourse(): ReplaySubject<boolean> {
    return this.editing;
  }
}
