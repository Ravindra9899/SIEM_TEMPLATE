import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ScanStatusService } from './scan-status.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScannerServiceService {

  private scanIndex = 0;

  constructor(private http: HttpClient, private scanStatusService: ScanStatusService) { }

  /**
   * It returns an observable of an array of scanners
   * @returns An observable of an array of scanners.
   */
  getAllScanners(): Observable<any> {
    let url = `${environment.backendBaseUrl}/all`;

    return this.http.get(url).pipe(
      catchError((err) => {
        console.log("cannot fetch all scanners " + err);
        return of([]);
      })
    );
  }

  /**
   * It returns an observable of an array of scanners
   * @returns An observable of an array of scanners.
   */
  getAllActiveScanners(): Observable<any> {
    let url = `${environment.backendBaseUrl}/scanners`;

    return this.http.get(url).pipe(
      catchError((err) => {
        console.log("cannot fetch available scanners " + err);
        return of([]);
      })
    );
  }

  /**
   * The function takes an IP address, a number of scanners, and a scan status subject as input. It
   * then returns an observable that emits the response from the backend
   * @param {string} ipToScan - The IP address to scan
   * @param {Number} numberOfScanners - This is the number of scanners that you want to use.
   * @param scanStatus - Subject<string>
   * @returns An observable of the response from the backend.
   */
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

  updateConfigurationOfScanner(config: Record<string, any>, apiName: string, status: string): Observable<any> {
    
    console.log("send request to update data");
    console.log(apiName);

    console.log(config);

    let url = `${environment.backendBaseUrl}/update-config`;

    return this.http.post(url, {
      "apiName": apiName,
      "config": config,
      "status": status
    }).pipe(
      catchError((err)=>{
        console.log("could not update the configuration of Virus Total");
        console.error(err);
        return of([]);
      })
    );
  }

  /**
   * It takes in an objectId and a newStatus, and then it updates the status of the scanner with the
   * given objectId to the newStatus
   * @param {string} objectId - The objectId of the scanner you want to update.
   * @param {string} newStatus - The new status of the scanner.
   * @returns An observable of the response from the backend.
   */
  updateStatusOfScanner(apiName: string, newStatus: string): Observable<any> {
    let url = `${environment.backendBaseUrl}/update-status`;

    return this.http.post(url, {
      "apiName": apiName,
      "newStatus": newStatus
    }).pipe(
      catchError((err) => {
        console.log("error in updating the status of the api at apiName " + apiName);
        console.error(err);
        return of([]);
      })
    );

  }

}
