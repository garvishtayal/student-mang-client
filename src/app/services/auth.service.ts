import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(model: LoginModel): Observable<any> {
    //will put api endpoint in ENVIRONMENT later
    return this.http.post<any>('http://localhost:5199/api/Auth/login', model);
  }
}
