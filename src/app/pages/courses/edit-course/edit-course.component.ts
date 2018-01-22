import { Component, OnInit } from '@angular/core';
import { DurationPipe } from '../../../pipes/duration.pipe';
import { CoursesService } from "../../../services/courses.service";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
  providers: [DurationPipe]
})
export class EditCourseComponent implements OnInit {

  public duration: number = 0;

  constructor(private courseServ: CoursesService) { }

  ngOnInit() {
  }

  stopEditing(): void {
    this.courseServ.editCourse(false);
  }
}
