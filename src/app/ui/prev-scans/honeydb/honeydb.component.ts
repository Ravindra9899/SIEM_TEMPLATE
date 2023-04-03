import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-honeydb',
  templateUrl: './honeydb.component.html',
  styleUrls: ['./honeydb.component.css']
})
export class HoneydbComponent implements OnInit {
  @Input()
  scanReport: Record<string, any> = {};

  constructor() { }

  ngOnInit(): void {
    console.log('honey db')
    console.log(this.scanReport);
    // this.sortedScanReport = [...this.scanReport].sort((a, b) => new Date(b["date"]).getTime() - new Date(a["date"]).getTime());
  }

}
