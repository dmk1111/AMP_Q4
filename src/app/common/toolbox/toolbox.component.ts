import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  @Input() courseName;
  @Output() search: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  searchValue(newValue: string) {
    console.log(newValue);
    this.search.emit(newValue);
  }
}
