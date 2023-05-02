import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-whois',
  templateUrl: './whois.component.html',
  styleUrls: ['./whois.component.css']
})
export class WhoisComponent implements OnInit {
  @Input()
  scanReport: Record<string, any> = {};

  count: number = 0;
  from: string = "";
  limit: number = 0;
  next: string = "";
  inetnums: any[] = [];
  selectedInetnum: any;


  constructor() { }

  ngOnInit(): void {
    this.inetnums = this.scanReport["inetnums"] != null ? this.scanReport["inetnums"] : [];
    this.count = this.scanReport["count"] != null ? this.scanReport["count"] : 0;
    this.from = this.scanReport["from"] != null ? this.scanReport["from"] : "";
    this.limit = this.scanReport["limit"] != null ? this.scanReport["limit"] : 0;
    this.next = this.scanReport["next"] != null ? this.scanReport["next"].toString() : "";

    // console.log(this.inetnums);
    // console.log(this.count);
  }

  showOrg(inetnum: any): void {
    this.selectedInetnum = inetnum;
  }
}
