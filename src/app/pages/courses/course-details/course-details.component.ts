import { Component, OnInit } from '@angular/core';
import { ICourseDetails } from './course-details.interface';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit, ICourseDetails {

  public courseDate: Date;
  public description: string;
  public type: 'Video' | 'Webinar';
  public duration: number;

  constructor() {

  }

  ngOnInit() {

  }

  editCourse() {

  }

  deleteCourse() {

  }

}
