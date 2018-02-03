import { Component, OnDestroy, OnInit } from "@angular/core";
import { ICourseDetails } from '../../app.interfaces';
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
  private courseSubscription: Subscription;
  private itemSubscription: Subscription;

  constructor(private courseServ: CoursesService, private searchPipe: SearchPipe) { }

  ngOnInit() {
    this.courseSubscription = this.courseServ.getList()
      .subscribe( (courses: ICourseDetails[]) => {
        this.courses = courses.map( (item: ICourseDetails) => {
            if (item === undefined || item.length === 0) {
              return undefined;
            }
            if (item.length > 250) {
              item.type = "Video";
            } else {
              item.type = "Webinar";
            }
            return item;
          });
      });
    this.courseServ.isEditingCourse()
      .subscribe( editing => {
        this.editing = editing;
      });
  }

  ngOnDestroy() {
    this.courseSubscription.unsubscribe();
    this.itemSubscription.unsubscribe();
    this.courses = [];
  }

  removeCourse(item: ICourseDetails) {
    this.itemSubscription = this.courseServ.removeItem(item.id)
      .subscribe(deleted => {
        this.courseSubscription = this.courseServ.getList()
          .subscribe( (courses: ICourseDetails[]) => {
            this.courses = courses.map( (item: ICourseDetails) => {
              if (item === undefined || item.length === 0) {
                return undefined;
              }
              if (item.length > 250) {
                item.type = "Video";
              } else {
                item.type = "Webinar";
              }
              return item;
            });
          });
      });
    if (!this.searchValue) {

    } else {
      this.search(this.searchValue);
    }
  }

  search(value: string): any {
    this.searchValue = value;
    this.courseSubscription = this.courseServ.getList()
      .subscribe( (courses: ICourseDetails[]) => {
        this.courses = this.searchPipe.transform(courses, this.searchValue, 'type').map( (item: ICourseDetails) => {
            if (item === undefined || item.length === 0) {
              return undefined;
            }
            if (item.length > 250) {
              item.type = "Video";
            } else {
              item.type = "Webinar";
            }
            return item;
          });
      });
  }
}
