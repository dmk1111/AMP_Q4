import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  @Input() courseName;
  @Output() search: EventEmitter<any> = new EventEmitter();
  constructor(private courseServ: CoursesService) { }

  ngOnInit() {
  }

  searchValue(newValue: string) {
    console.log(newValue);
    this.search.emit(newValue);
  }

  addCourse(): void {
    this.courseServ.editCourse(true);
  }
}
