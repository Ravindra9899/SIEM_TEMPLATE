import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanStatusService {

  constructor() { }

  private scanStatus = new Subject<string>();

  emitScanStatus(status: string){
    this.scanStatus.next(status);
  }
}
