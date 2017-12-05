import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  @Input() courseName;
  constructor() { }

  ngOnInit() {
  }

  search(newValue: string) {
    console.log(newValue);
  }
}
