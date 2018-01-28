import { Component, OnDestroy, OnInit } from "@angular/core";
import { ICourseDetails } from './course-details/course-details.interface';
import { CoursesService } from '../../services/courses.service';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { SearchPipe } from '../../pipes/search.pipe';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [OrderByPipe, SearchPipe]
})
export class CoursesComponent implements OnInit, OnDestroy {

  public courses: ICourseDetails[] = [];
  public editing: boolean = false;

  private searchValue = '';
  private subscription: Subscription;

  constructor(private courseServ: CoursesService, private searchPipe: SearchPipe) { }

  ngOnInit() {
    this.subscription = this.courseServ.getList()
      .map( item => {
        if (!item.courseDate) {
            item.courseDate = new Date().toISOString();
        }
        return item;
      })
      .subscribe( courses => this.courses.push(courses));
    this.courseServ.isEditingCourse()
      .subscribe( editing => {
        this.editing = editing;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeCourse(item) {
    this.courseServ.removeItem(item);
    this.subscription.unsubscribe();
    if (!this.searchValue) {
      this.courses = [];
      this.subscription = this.courseServ.getList()
        .map( item => {
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
    this.subscription = this.courseServ.getList()
      .map( item => {
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
