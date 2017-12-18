import { Component, OnInit } from '@angular/core';
import { ICourseDetails } from './course-details/course-details.interface';
import { CoursesService } from "../../services/courses.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  public courses: ICourseDetails[] = [];

  constructor(private courseServ: CoursesService) { }

  ngOnInit() {
    this.courses = this.courseServ.getList();
  }

  removeCourse(id: number) {
    console.log(`Course deleted!`);
    this.courseServ.removeItem(id);
  }
}
