import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatasetTagPatternService {

  constructor(private http: HttpClient) { }

  /**
   * The function `getTagPatternsFromDatasetName` retrieves tag patterns from a dataset name using an
   * HTTP GET request.
   * @param {string} datasetName - A string representing the name of the dataset.
   * @returns an Observable<any>.
   */
  getTagPatternsFromDatasetName(datasetName: string): Observable<any> {
    let uri = '/api/dataset-tag-pattern';

    //setting dataset name as param
    let params = new HttpParams().set("dataset", datasetName);

    return this.http.get(uri, {'params': params}).pipe(
      catchError((err) => {
        console.error('error in getTagPatternsFromDatasetName');
        console.error(err);
        return of([]);
      })
    );
  }

}
