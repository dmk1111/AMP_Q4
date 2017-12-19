import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ICourseDetails } from './course-details.interface';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit, OnChanges, ICourseDetails {
  @Input() course: ICourseDetails;
  @Input() courseId: number;
  @Output() removeCourse: EventEmitter<any> = new EventEmitter();

  public courseDate;
  public description;
  public type;
  public duration;

  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.courseDate = new Date(this.course.courseDate).toLocaleDateString('en-US');
    this.description = this.course.description;
    this.type = this.course.type;
    this.duration = {
      hours: Math.floor(this.course.duration / 60),
      minutes: this.course.duration % 60
    };

  }

  editCourse() {

  }

  deleteCourse() {
    this.removeCourse.emit(this.courseId);
  }

}
