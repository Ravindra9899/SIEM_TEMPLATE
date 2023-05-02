import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-virustotal',
  templateUrl: './virustotal.component.html',
  styleUrls: ['./virustotal.component.css']
})
export class VirustotalComponent implements OnInit {
  @Input()
  scanReport: Record<string, any> = {};

  constructor() { }

  ngOnInit(): void {
    console.log(typeof this.scanReport['crowdsourced_context']);
    console.log(typeof this.scanReport['last_analysis_results']);
    console.log(typeof this.scanReport['last_analysis_stats']);
    console.log(typeof this.scanReport['last_https_certificate']);
    console.log(typeof this.scanReport['total_votes']);
  }

  dateConverter(unixTime: number): string {
    let date = new Date(unixTime * 1000);
    return date.toUTCString();
  }

  isDictionary(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  getObjectKeys(obj: Object){
    return Object.keys(obj);
  }

  showField(fieldName: string): boolean {
    if (
      this.scanReport != null &&
      this.scanReport.hasOwnProperty(fieldName) &&
      this.scanReport[fieldName] != null
    ) {
      return true;
    }
    return false;
  }

}
