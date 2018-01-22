import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailsComponent } from './pages/courses/course-details/course-details.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { ToolboxComponent } from './common/toolbox/toolbox.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthorizationService } from './services/authorization.service';
import { CoursesService } from './services/courses.service';
import { PlateBorderDirective } from './directives/plate-border.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { EditCourseComponent } from './pages/courses/edit-course/edit-course.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailsComponent,
    HeaderComponent,
    FooterComponent,
    ToolboxComponent,
    LoginComponent,
    PlateBorderDirective,
    DurationPipe,
    OrderByPipe,
    SearchPipe,
    EditCourseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    AuthorizationService,
    CoursesService,
    DurationPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
