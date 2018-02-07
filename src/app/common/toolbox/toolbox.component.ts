import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  @Input() courseName;
  @Output() search: EventEmitter<any> = new EventEmitter();
  constructor(private courseServ: CoursesService, private router: Router) { }

  ngOnInit() {
  }

  searchValue(newValue: string) {
    console.log(newValue);
    this.search.emit(newValue);
  }
}
