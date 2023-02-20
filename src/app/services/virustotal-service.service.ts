import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ScanStatusService } from './scan-status.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VirustotalServiceService {

  private scanIndex = 0;

  constructor(private http: HttpClient, private scanStatusService: ScanStatusService) { }

  getAllScanners(): Observable<any> {
    let url = `${environment.backendBaseUrl}/all`;

    return this.http.get(url).pipe(
      catchError((err) => {
        console.log("cannot fetch all scanners " + err);
        return of([]);
      })
    );
  }

  getAllActiveScanners(): Observable<any> {
    let url = `${environment.backendBaseUrl}/scanners`;

    return this.http.get(url).pipe(
      catchError((err) => {
        console.log("cannot fetch available scanners " + err);
        return of([]);
      })
    );
  }

  getVirusTotalResponse(ipToScan: string, numberOfScanners: Number, scanStatus: Subject<string>): Observable<any> {
    const N = numberOfScanners;
    this.scanIndex = 1;
    this.scanStatusService.emitScanStatus(`Please wait; scan ongoing; ${this.scanIndex}/${N}`);

    const httpOptionsWithApiKey = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: {
        'ip_to_scan': ipToScan
      }
    };

    const url = `${environment.backendBaseUrl}/vtScan`;
    this.scanStatusService.emitScanStatus(`Scan Completed`)

    const scanObservable = this.http.get(url, httpOptionsWithApiKey).pipe(
      catchError((err) => {
        console.error('An error occurred during vtscan:', err);
        return of([]);
      })
    );

    scanObservable.subscribe({
      next: (response) => {
        console.log("scan status subscribe " + response);
        scanStatus.next(`Completed ${this.scanIndex}/${N}`);
      },
      error: (error) => {
        console.error('An error occurred during vtscan:', error);
      },
      complete: () => {
        scanStatus.next(`Completed ${this.scanIndex}/${N}`);
        scanStatus.complete();
      }
    });
    return scanObservable;
  }

}
