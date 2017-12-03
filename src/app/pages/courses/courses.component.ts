import { Component, OnInit } from '@angular/core';
import { ICourseDetails } from './course-details/course-details.interface';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  public courses: ICourseDetails[] = [
    {
      courseDate: this.yourRandomGenerator(2, 8, 2),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      type: 'Video',
      duration: 88,
    },
    {
      courseDate: this.yourRandomGenerator(2, 8, 2),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      type: 'Video',
      duration: 15,
    },
    {
      courseDate: this.yourRandomGenerator(2, 8, 2),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      type: 'Video',
      duration: 135,
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  private yourRandomGenerator(rangeOfDays: number, startHour: number, hourRange: number): Date {
    const today = new Date(Date.now());
    return new Date(today.getFullYear() + 1900, today.getMonth(), today.getDate() + Math.random() * rangeOfDays,
      Math.random() * hourRange + startHour, Math.random() * 60);
  }
}
