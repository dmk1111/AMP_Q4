import { Component, OnInit } from '@angular/core';
import { ICourseDetails } from './course-details/course-details.interface';
import { CoursesService } from '../../services/courses.service';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [OrderByPipe, SearchPipe]
})
export class CoursesComponent implements OnInit {

  public courses: ICourseDetails[] = [];

  private searchValue = '';

  constructor(private courseServ: CoursesService, private searchPipe: SearchPipe) { }

  ngOnInit() {
    this.courses = this.courseServ.getList();
  }

  removeCourse(item) {
    console.log(`Course deleted!`);
    this.courseServ.removeItem(item);
    if (!this.searchValue) {
      this.courses = this.courseServ.getList();
    } else {
      this.search(this.searchValue);
    }
  }

  search(value: string): any {
    this.searchValue = value;
    this.courses = this.searchPipe.transform(this.courseServ.getList(), this.searchValue, 'type');
  }
}
