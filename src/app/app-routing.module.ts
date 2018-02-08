import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CoursesComponent} from './pages/courses/courses.component';
import {EditCourseComponent} from './pages/courses/edit-course/edit-course.component';
import {LoginComponent} from './pages/login/login.component';
import {NotFoundComponent} from './common/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', children: [
      {path: '', component: CoursesComponent},
      { path: 'new', component: EditCourseComponent },
      { path: ':id', component: EditCourseComponent },
    ] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
