import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationIpsService {

  constructor(private http: HttpClient) {}

  getDestinationIpsForAllIndices(sourceIpAddress: string): Observable<any>{
    let postUrl = `${environment.backendBaseUrl}/dest-ips`;

    console.log("destinaion-ip-service::Sending Data to '", postUrl, "':: ", sourceIpAddress);
    return this.http.post(postUrl, {
      "inputIpAddress": sourceIpAddress
    }).pipe(
      catchError((err)=> {
        console.log("destinaion-ip-service::could not get the destination ips from backend");
        console.log(err['error']['error']);
        return of({
          "error": err['error']['error']
        });
      })
    );
  }

}
