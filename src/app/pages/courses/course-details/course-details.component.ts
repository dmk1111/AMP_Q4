import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICourseDetails } from '../../../app.interfaces';
import { UpperCasePipe } from '@angular/common';
import { DurationPipe } from '../../../pipes/duration.pipe';
import { CoursesService } from '../../../services/courses.service';
import {Router} from '@angular/router';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  providers: [UpperCasePipe, DurationPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsComponent implements OnInit, OnChanges, ICourseDetails {
  @Input() course: ICourseDetails;
  @Output() removeCourse: EventEmitter<any> = new EventEmitter();

  public id;
  public date;
  public description;
  public type;
  public length;
  public name;

  constructor(private upPipe: UpperCasePipe, private courseSev: CoursesService, private router: Router) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.id = this.course.id;
    this.date = new Date(this.course.date);
    this.description = this.course.description;
    this.type = this.course.type === 'Video' ? this.upPipe.transform(this.course.type) : this.course.type ;
    this.length = this.course.length;

  }

  editCourse() {
    console.log('Edit clicked!');
    // this.courseSev.editCourse(true);
    this.router.navigate(['/courses', this.id]);
  }

  deleteCourse() {
    this.removeCourse.emit(this.course);
  }

}
