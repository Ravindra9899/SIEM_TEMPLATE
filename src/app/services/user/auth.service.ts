import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = '/api/users/login';

  private roles = ['admin', 'guest', 'user'];

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    const requestBody = {
      username: username,
      password: password
    };

    // console.log(requestBody);

    return this.http.post<any>(this.loginUrl, requestBody).pipe(
      catchError(err => {
        return of([]);
      })
    );
  }

  isAuthenticated() {
    const token = localStorage.getItem('jwt');

    if (token) {
      const decodedToken = jwt_decode(token) as {
        username: string,
        active: string,
        role: string,
        iat: number,
        exp: number
      };
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('jwt');

    if (token && token != null) {

      const decodedToken = jwt_decode(token) as {
        username: string,
        active: string,
        role: string,
        iat: number,
        exp: number
      };

      if (
        decodedToken?.username &&
        decodedToken?.role &&
        decodedToken?.active
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getUserRole(): string {

    const token = localStorage.getItem('jwt');

    if (token && token != null) {

      const decodedToken = jwt_decode(token) as {
        username: string,
        active: string,
        role: string,
        iat: number,
        exp: number
      };

      if (
        decodedToken?.username &&
        decodedToken?.role &&
        decodedToken?.active
      ) {
        return decodedToken?.role;
      } else {
        return 'guest'
      }
    } else {
      return 'guest';
    }
  }

  getAuthToken() {
    const authToken = localStorage.getItem('jwt');

    if (authToken && authToken != null && authToken != '' && this.isTokenValid()) {
      return authToken;
    } else {
      return false;
    }
  }
}

