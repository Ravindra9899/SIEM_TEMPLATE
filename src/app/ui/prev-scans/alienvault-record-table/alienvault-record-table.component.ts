import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alienvault-record-table',
  templateUrl: './alienvault-record-table.component.html',
  styleUrls: ['./alienvault-record-table.component.css']
})
export class AlienvaultRecordTableComponent implements OnInit {
[x: string]: any;
  @Input()
  scanReport: Record<string, any> = {};

  constructor() { }

  ngOnInit(): void {
  }

  falsePositiveFieldValtest(): boolean{
    if(
      Array.isArray(this.scanReport['false_positive']) &&
      this.scanReport['false_positive'].length > 0
      ) {
      return true;
    }
    return false;
  }

  typeOfValidation(item: any){
    if (typeof item === 'string') {
      return 'string';
    } else {
      return 'object';
    }
  }

}
