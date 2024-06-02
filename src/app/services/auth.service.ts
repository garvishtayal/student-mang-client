import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  globalRole:any;
  constructor(private http: HttpClient) { }

  login(model: LoginModel): Observable<any> {
    //will put api endpoint in ENVIRONMENT later
    return this.http.post<any>('http://localhost:5199/api/Auth/login', model);
  }

  validate(token: string): Observable<any> {
    return this.http.post<any>('http://localhost:5199/api/Auth/validate', { token: token });
  }

  setRole(role: string) {
    this.globalRole = role;
  }

  getRole() {
    return this.globalRole;
  }

  addUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`http://localhost:5199/api/Auth/admin/addUser`, user, { headers: headers });
  }
  
  fetchStudents(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`http://localhost:5199/api/Auth/getAllStudents`, { headers: headers });
  }

}
