import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElasticBackendService {

  backendURL: string;

  constructor(private http: HttpClient) {
    this.backendURL = 'http://localhost:3000';
  }

  getDestIps(reqData: {}){
    let postUrl = this.backendURL+'/destIps';
    console.log("Sending Data to '", postUrl, "':: ", reqData);
    return this.http.post(postUrl, reqData);
  }
}
