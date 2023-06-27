import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  // const baseUri = '';

  constructor(private http: HttpClient) { }

  getAllDocCount() {
    let uri = '/logs';

    return this.http.get(uri).pipe(
      catchError((err) => {
        console.error('error in getAllDocCount');
        console.error(err);
        return of([]);
      })
    );
  }
}
