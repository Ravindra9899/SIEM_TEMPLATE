import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElasticBackendService {

  constructor(private http: HttpClient) { }

  getAllIndex(){
    return this.http.get('http://localhost:3000/destIps');
  }

  getDestIps(reqData: {}){
    return this.http.post('http://localhost:3000/destIps', reqData);
  }
}
