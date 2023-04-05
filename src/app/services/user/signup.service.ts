import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = '/api/users/register';

  constructor(private http: HttpClient) { }

  signUp(username: string, password: string, confirmPassword: string): Observable<any> {
    const body = { username, password, confirmPassword };
    return this.http.post(`${this.apiUrl}/signup`, body);

  }
}
