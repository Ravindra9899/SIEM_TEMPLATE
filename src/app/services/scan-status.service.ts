import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanStatusService {

  constructor() { }

  private scanStatus = new Subject<string>();

  /**
   * It takes a string as an argument and emits it to the scanStatus subject
   * @param {string} status - string - The status of the scan.
   */
  emitScanStatus(status: string){
    this.scanStatus.next(status);
  }
}
