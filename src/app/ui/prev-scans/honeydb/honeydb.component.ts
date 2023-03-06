import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-honeydb',
  templateUrl: './honeydb.component.html',
  styleUrls: ['./honeydb.component.css']
})
export class HoneydbComponent implements OnInit {
  @Input()
  scanReport = [];

  public sortedScanReport= [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.scanReport);
    this.sortedScanReport = [...this.scanReport].sort((a, b) => new Date(b["date"]).getTime() - new Date(a["date"]).getTime());
  }

}
