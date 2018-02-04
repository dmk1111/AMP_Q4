import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DurationPipe } from '../../../pipes/duration.pipe';
import { CoursesService } from "../../../services/courses.service";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
  providers: [DurationPipe]
})
export class EditCourseComponent implements OnInit {

  editCourseForm: FormGroup;

  constructor(private courseServ: CoursesService, private fb: FormBuilder) {
    this.editCourseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: ['', [Validators.required, Validators.pattern(/^((0[1-9]|[12][0-9]|3[01])(\/)(0[13578]|1[02]))|((0[1-9]|[12][0-9])(\/)(02))|((0[1-9]|[12][0-9]|3[0])(\/)(0[469]|11))(\/)\d{4}$/)]],
      duration: [0, Validators.required],
      authors: [[], Validators.required]
    });
  }

  ngOnInit() {
  }

  stopEditing(): void {
    localStorage.setItem("editedCourse", JSON.stringify(this.editCourseForm.value));
    this.courseServ.editCourse(false);
    this.editCourseForm.reset();
    console.log(JSON.parse(localStorage.getItem("editedCourse")));
  }
}
