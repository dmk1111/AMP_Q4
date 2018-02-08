import {Injectable} from '@angular/core';
import {IAuthor, ICourseDetails} from '../app.interfaces';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

// import { HttpResponse } from "@angular/common/http/src/response";

@Injectable()
export class CoursesService {

  private courses: ICourseDetails[] = [];
  private editing: ReplaySubject<boolean>;
  private baseUrl: string;
  private authors: IAuthor[] = [];
  private authorsReceived: boolean = false;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3004';
    this.editing = new ReplaySubject<boolean>();
  }

  getAuthorsList(): Observable<IAuthor[]> {
    if (this.authorsReceived) {
      return Observable.of(this.authors);
    } else {
    return this.getAuthorsOnce().map(authors => {
        this.authors = authors;
        this.authorsReceived = true;
        return authors;
      });
    }
  }

  getCoursesList(): Observable<ICourseDetails[]> {
    this.getAuthorsOnce()
      .subscribe( authors => {
        this.authors = authors;
        this.authorsReceived = true;
      });
    let start = 0;
    let count = 30;
    const url = `${this.baseUrl}/courses`;
    let params = new HttpParams();
    params = params.append('start', `${start}`);
    params = params.append('count', `${count}`);

    return <Observable<ICourseDetails[]>>this.http.get(url, {params: params});

  }

  getItem(id: number): Observable<ICourseDetails> {
    this.getAuthorsOnce()
      .subscribe( authors => {
        this.authors = authors;
        this.authorsReceived = true;
      });

    const url = `${this.baseUrl}/courses/${id}`;

    return this.http.get(url, {params: new HttpParams()})
      .map((item: ICourseDetails) => item);
  }

  updateItem(id: number, course: ICourseDetails): any {
    let url = `${this.baseUrl}/courses/${id}`;

    return this.http.put(url, {course: course})
      .map((item: ICourseDetails) => item);
  }

  removeItem(id: number): Observable<HttpResponse<Object>> {
    const url = `${this.baseUrl}/courses/${id}`;

    return this.http.delete(url, {observe: 'response'});
  }

  createCourse(course: ICourseDetails): Observable<object> {
    const url = `${this.baseUrl}/courses/`;

    return this.http.post(url, {course: course});
  }

  editCourse(edit: boolean) {
    this.editing.next(edit);
  }

  isEditingCourse(): ReplaySubject<boolean> {
    return this.editing;
  }

  private getAuthorsOnce(): Observable<IAuthor[]> {
    if (this.authorsReceived) {
      return Observable.of(this.authors);
    }
    let start = 0;
    let count = 82;
    const url = `${this.baseUrl}/authors`;
    let params = new HttpParams();
    params = params.append('start', `${start}`);
    params = params.append('count', `${count}`);

    return <Observable<IAuthor[]>>this.http.get(url, {params: params});
  }
}
