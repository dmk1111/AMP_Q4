import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICourseDetails } from './course-details.interface';
import { UpperCasePipe } from '@angular/common';
import { DurationPipe } from '../../../pipes/duration.pipe';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  providers: [UpperCasePipe, DurationPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsComponent implements OnInit, OnChanges, ICourseDetails {
  @Input() course: ICourseDetails;
  @Input() courseId: number;
  @Output() removeCourse: EventEmitter<any> = new EventEmitter();

  public courseDate;
  public description;
  public type;
  public duration;

  constructor(private upPipe: UpperCasePipe) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.courseDate = new Date(this.course.courseDate);
    this.description = this.course.description;
    this.type = this.course.type === 'Video' ? this.upPipe.transform(this.course.type) : this.course.type ;
    this.duration = this.course.duration;

  }

  editCourse() {
    console.log('Edit clicked!');
  }

  deleteCourse() {
    this.removeCourse.emit(this.course);
  }

}
