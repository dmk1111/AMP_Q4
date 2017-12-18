import { Injectable } from '@angular/core';
import { ICourseDetails } from "../pages/courses/course-details/course-details.interface";

@Injectable()
export class CoursesService {

  private courses: ICourseDetails[] = [];

  constructor() {
    this.courses = [
      {
        courseDate: new Date('Mon Dec 04 2017 17:40:51 GMT+0200 (EET)'),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        type: 'Video',
        duration: 88,
      },
      {
        courseDate: new Date('Tue Dec 05 2017 17:40:51 GMT+0200 (EET)'),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        type: 'Video',
        duration: 15,
      },
      {
        courseDate: new Date('Tue Dec 05 2017 17:45:51 GMT+0200 (EET)'),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        type: 'Video',
        duration: 135,
      }
    ];
  }

  getList(): ICourseDetails[] {
    return this.courses;
  }

  getItem(id: number): ICourseDetails {
    return this.courses[id];
  }

  updateItem(id: number, course: ICourseDetails): void {
    this.courses[id] = course;
  }

  removeItem(id: number): void {
    this.courses.splice(id, 1);
  }

  createCourse(course: ICourseDetails): void {
    this.courses.push(course);
  }
}
