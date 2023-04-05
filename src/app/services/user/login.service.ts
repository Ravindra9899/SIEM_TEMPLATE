import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = '/api/users/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    const requestBody = {
      username: username,
      password: password
    };

    console.log(requestBody);

    return this.http.post<any>(this.loginUrl, requestBody).pipe(
      catchError(err => {
        return of([]);
      })
    );
  }
}

