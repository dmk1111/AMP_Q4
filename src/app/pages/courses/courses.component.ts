import { Component, OnInit } from '@angular/core';
import { ICourseDetails } from './course-details/course-details.interface';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  public courses: ICourseDetails[] = [];

  constructor() { }

  ngOnInit() {
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

  removeCourse(id: number) {
    console.log(id);
  }
}
