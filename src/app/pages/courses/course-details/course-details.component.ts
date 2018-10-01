import { Component, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICourseDetails } from '../../../app.interfaces';
import { UpperCasePipe } from '@angular/common';
import { DurationPipe } from '../../../pipes/duration.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  providers: [UpperCasePipe, DurationPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsComponent implements OnChanges, ICourseDetails {
  @Input() course: ICourseDetails;
  @Output() removeCourse: EventEmitter<any> = new EventEmitter();

  public id;
  public date;
  public description;
  public type;
  public length;
  public name;

  constructor(private upPipe: UpperCasePipe, private router: Router) {

  }

  ngOnChanges() {
    this.id = this.course.id;
    this.date = new Date(this.course.date);
    this.description = this.course.description;
    this.type = this.course.type === 'Video' ? this.upPipe.transform(this.course.type) : this.course.type ;
    this.length = this.course.length;
  }

  editCourse() {
    this.router.navigate(['/courses', this.id]);
  }

  deleteCourse() {
    this.removeCourse.emit(this.course);
  }

}
