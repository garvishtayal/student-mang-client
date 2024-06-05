import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  userRole: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userRole = this.authService.getRole();
  }

  getCourses(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

      return this.http.get<any>('http://localhost:5199/api/Course', { headers: headers });
  }

  getAssignedCourses(studentMail: string) {

    return this.http.post<any>('http://localhost:5199/api/Course/assignedCourses', { Email: studentMail });
  }

  deleteCourse(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`http://localhost:5199/api/Course/${id}`, { headers: headers });

  }

  addCourse(course: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>('http://localhost:5199/api/Course', course, { headers: headers });
  }

  assignCourse(assignCourseData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>('http://localhost:5199/api/Course/assign', assignCourseData, { headers: headers });
  }


}
