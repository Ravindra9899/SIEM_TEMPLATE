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


  constructor(private http: HttpClient, private scanStatusService: ScanStatusService) { }

  /**
   * It returns an observable of an array of scanners
   * @returns An observable of an array of scanners.
   */
  getAllScanners(): Observable<any> {
    let url = `${environment.backendBaseUrl}/ipscan/all`;

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
    let url = `${environment.backendBaseUrl}/ipscan/active`;

    return this.http.get(url).pipe(
      catchError((err) => {
        console.log("cannot fetch available scanners " + err);
        return of([]);
      })
    );
  }

  /**
   * It sends a POST request to the backend to update the configuration of a scanner
   * @param config - The configuration object that is to be updated.
   * @param {string} apiName - The name of the API.
   * @param {string} status - This is the status of the scanner. It can be either "active" or
   * "inactive".
   * @returns An observable of the response from the backend.
   */
  updateConfigurationOfScanner(config: Record<string, any>, apiName: string, status: string): Observable<any> {
    
    console.log("send request to update data");
    console.log(apiName);

    console.log(config);

    let url = `${environment.backendBaseUrl}/ipscan/update-config`;

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
    let url = `${environment.backendBaseUrl}/ipscan/update-status`;

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

  /**
   * It makes a POST request to the backend with the API name, offset, limit and order values as the
   * request body
   * @param {string} apiName - The name of the API for which you want to retrieve the scan reports.
   * @param {string} offsetVal - The offset value for pagination.
   * @param {string} limitVal - The number of scan reports to be returned.
   * @param {string} orderVal - This is the order in which the scan reports are to be retrieved. It can
   * be either "asc" or "desc".
   * @returns An observable of an array of scan reports.
   */
  readAllScanReportsForApi(apiName: string, offsetVal: string, limitVal: string, orderVal: string, ipAddress: string): Observable<any>{
    let url = `${environment.backendBaseUrl}/ipscan/read-report-ip-api`;

    console.log("Get request query ", {
      "apiName": apiName,
      "offset": offsetVal,
      "limit": limitVal,
      "order": orderVal,
      "ipAddress": ipAddress
    });

    return this.http.get(
      `${url}?ipAddress=${ipAddress}&apiName=${apiName}&sort=${orderVal}&offset=${offsetVal}&limit=${limitVal}`
    ).pipe(
      catchError((err)=>{

        console.log(`Error in retrieving scan reports for ${apiName}`);
        console.log(err);

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
  getIpScanResponse(ipToScan: string, apiName: string, numberOfScanners: Number, scanIndex: Number, scanStatus : Subject<any>): Observable<any>{

    const N = numberOfScanners;

    const httpOptions = {
      params : {
      'ip_to_scan': ipToScan,
      'apiName': apiName
    }};

    const url = `${environment.backendBaseUrl}/ipscan/scan`;
    this.scanStatusService.emitScanStatus(
      `Please wait; scan ongoing; ${scanIndex}/${N}`
      );

    const scanObservable = this.http.get(url, httpOptions).pipe(
      catchError((err) => {
        console.error('An error occurred during scanning with ', apiName, " ", err);
        return of([]);
      })
    );

    scanObservable.subscribe({
      next: (response) => {
        console.log("scan status subscribe " + response);
        scanStatus.next(`Completed ${scanIndex}/${N}`);
      },
      error: (error) => {
        console.error('An error occurred during whois-ip-netblocks:', error);
      },
      complete: () => {
        scanStatus.next(`Completed ${scanIndex}/${N}`);
        scanStatus.complete();
      }
    });
    this.scanStatusService.emitScanStatus(`Scan Completed`)
    return scanObservable;

    return scanObservable;

  }

  /**
   * It returns an observable of an array of objects, each object containing a scanner name and the
   * number of scan reports that scanner has created
   * @returns An observable of an array of objects.
   */
  countScanReportsPerScanner():Observable<any>{
    let url = `${environment.backendBaseUrl}/ipscan/count-scan-reports`;
    return this.http.get(url).pipe(
      catchError((err)=>{
        console.log("count scan report service error " + err);
        return of([]);
      })
    );
  }

  readScanReportsForIpAndApiDateRange(
    ipAddress: string,
    apiName: string,
    startDateUtc: string,
    endDateUtc: string,
    order: string,
    limit: string, 
    skip: string
  ): Observable<any>{
    let url = `${environment.backendBaseUrl}/ipscan/read-reports-ip-api-date`
    url = url + "?";
    url = url + `ipAddress=${ipAddress}&`;
    url = url + `apiName=${apiName}&`;
    url = url + `startDate=${startDateUtc}&`;
    url = url + `endDate=${endDateUtc}&`;
    url = url + `order=${order}&`;
    url = url + `limit=${limit}&`;
    url = url + `skip=${skip}`;

    return this.http.get(url).pipe(
      catchError((err)=>{
        console.error("Error in read scan reports for ip and api date range service");
        console.error(err);
        return of([]);
      })
    );
  }

}
