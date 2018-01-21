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
    this.courseServ.getList()
      .map( item => {
        console.log(item);
        if (!item.courseDate) {
            item.courseDate = new Date().toISOString();
        }
        return item;
      })
      .subscribe( courses => this.courses.push(courses));
  }

  removeCourse(item) {
    console.log(`Course deleted!`);
    this.courseServ.removeItem(item);
    if (!this.searchValue) {
      this.courses = [];
      this.courseServ.getList()
        .map( item => {
          console.log(item);
          if (!item.courseDate) {
            item.courseDate = new Date().toISOString();
          }
          return item;
        })
        .subscribe( courses => this.courses.push(courses));
    } else {
      this.search(this.searchValue);
    }
  }

  search(value: string): any {
    let coursesArr = [];
    this.searchValue = value;
    this.courseServ.getList()
      .map( item => {
        console.log(item);
        if (!item.courseDate) {
          item.courseDate = new Date().toISOString();
        }
        return item;
      })
      .subscribe( courses => {
        coursesArr.push(courses);
        this.courses = this.searchPipe.transform(coursesArr, this.searchValue, 'type');
      });
  }
}
