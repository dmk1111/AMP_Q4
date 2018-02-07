import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {DurationPipe} from '../../../pipes/duration.pipe';
import {CoursesService} from '../../../services/courses.service';
import {validateAuthors} from '../../../common/validators/validateAuthors';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
  providers: [DurationPipe]
})
export class EditCourseComponent implements OnInit {

  editCourseForm: FormGroup;
  courseId: number = undefined;
  authors: string[] = [];

  constructor(private courseServ: CoursesService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.editCourseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: [
        '',
        [
          Validators.required,
          Validators.pattern(
          /^((0[1-9]|[12][0-9]|3[01])(\/)(0[13578]|1[02]))|((0[1-9]|[12][0-9])(\/)(02))|((0[1-9]|[12][0-9]|3[0])(\/)(0[469]|11))(\/)\d{4}$/)
        ]
      ],
      length: [0, Validators.required],
      authors: [[], [Validators.required, validateAuthors]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      if (params['id']) {
        this.courseId = +params['id'];
        this.courseServ.getItem(this.courseId).subscribe( course => {
          this.editCourseForm.patchValue({'title': course.name });
          this.editCourseForm.patchValue({'description': course.description});
          this.editCourseForm.patchValue({'date': new DatePipe('en').transform(course.date, 'dd/MM/yyyy')});
          this.editCourseForm.patchValue({'length': course.length});
          this.authors = course.authors.map( author => {
            return `${author.firstName} ${author.lastName}`;
          });
          this.editCourseForm.patchValue({'authors': this.authors});
          });
      }
    });
  }

  stopEditing(): void {
    localStorage.setItem('editedCourse', JSON.stringify(this.editCourseForm.value));
    if (this.courseId) {
      this.courseServ.updateItem(this.courseId, this.editCourseForm.value);
    } else {
      this.courseServ.createCourse(this.editCourseForm.value);
    }
    this.editCourseForm.reset();
    console.log(JSON.parse(localStorage.getItem('editedCourse')));
    this.router.navigate(['/courses']);
  }
}
