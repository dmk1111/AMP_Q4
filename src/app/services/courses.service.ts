import { Injectable } from '@angular/core';
import { ICourseDetails } from '../app.interfaces';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { ReplaySubject } from "rxjs/ReplaySubject";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
// import { HttpResponse } from "@angular/common/http/src/response";

@Injectable()
export class CoursesService {

  private courses: ICourseDetails[] = [];
  private editing: ReplaySubject<boolean>;
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:3004";
    this.editing = new ReplaySubject<boolean>();
  }

  getList(): Observable<ICourseDetails[]> {
    let start = 0;
    let count = 30;
    let url = `${this.baseUrl}/courses`;
    let params = new HttpParams();
    params = params.append("start", `${start}`);
    params = params.append("count", `${count}`);

    return <Observable<ICourseDetails[]>>this.http.get(url, {params: params});

  }

  getItem(id: number): Observable<ICourseDetails> {

    let url = `${this.baseUrl}/courses/${id}`;

    return this.http.get(url, {params: new HttpParams()})
      .map((item: ICourseDetails) => item);
  }

  updateItem(id: number, course: ICourseDetails): any {
    let url = `${this.baseUrl}/courses/${id}`;

    return this.http.put(url, {course: course})
      .map((item: ICourseDetails) => item);
  }

  removeItem(id: number): Observable<HttpResponse<Object>> {
    // const id = this.courses.findIndex(function (element) {
    //   return element === item;
    // });
    // this.courses.splice(id, 1);
    let url = `${this.baseUrl}/courses/${id}`;

    return this.http.delete(url, {observe: 'response'});
  }

  createCourse(course: ICourseDetails): Observable<object> {
    // this.courses.push(course);
    let url = `${this.baseUrl}/courses/`;

    return this.http.post(url, {course: course});
  }

  editCourse(edit: boolean) {
    this.editing.next(edit);
  }

  isEditingCourse(): ReplaySubject<boolean> {
    return this.editing;
  }
}
