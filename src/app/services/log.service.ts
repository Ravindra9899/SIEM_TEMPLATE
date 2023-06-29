import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  // const baseUri = '';

  private rules = {
    "%email%": "\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+",
    "%ipAddress%": "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",
    "%numeric%": "\d+",
    "%alphabet%": "[a-zA-Z]*",
    "%alnum%": "[a-zA-Z0-9]*"
  };

  constructor(private http: HttpClient) { }

  getAllDocCount(): Observable<any> {
    let uri = '/api/logs';

    return this.http.get(uri).pipe(
      catchError((err) => {
        console.error('error in getAllDocCount');
        console.error(err);
        return of([]);
      })
    );
  }

  placeholders(str: string): string {
    let pattern = str;
    Object.entries(this.rules).forEach(([placeholder, regex]) => {
      pattern = pattern.replace(placeholder, regex);
    });

    return pattern;
  }

  getDatasetNameForLog(log: string): Observable<string> {
    var matchDatasetName = "";
    for (const [key, val] of Object.entries(localStorage)) {
      const regexPattern = new RegExp(val);
      console.log('regexpattern ', regexPattern, " :: ", regexPattern.test(log));
      if (regexPattern.test(log)) {
        matchDatasetName = key;
        break
      }
    }
    return of(matchDatasetName);
  }

  getAllDataset(): Observable<any> {
    let uri = '/api/dataset';

    return this.http.get(uri).pipe(
      catchError((err) => {
        console.error('error in getAllDataset');
        console.error(err);
        return of([]);
      })
    );
  }

  postPatternForDataset(patternFormData: any): Observable<any> {
    let uri = '/api/dataset-tag-pattern';

    let reqBody = {
      'tagName': patternFormData['pattern'],
      'datasetName': patternFormData['selectedDataset']
    }

    console.log("sent data:::::", reqBody);

    return this.http.post(uri, reqBody).pipe(
      catchError((err) => {
        console.error('error in datasettagpatternadd');
        console.error(err);
        return of([]);
      })
    );
  }
}
