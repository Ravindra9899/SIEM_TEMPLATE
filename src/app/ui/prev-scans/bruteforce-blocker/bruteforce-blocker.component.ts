import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bruteforce-blocker',
  templateUrl: './bruteforce-blocker.component.html',
  styleUrls: ['./bruteforce-blocker.component.css']
})
export class BruteforceBlockerComponent implements OnInit {

  @Input()
  scanReport: Record<string, any> = {};

  constructor() { }

  ngOnInit(): void {
    console.info(this.scanReport["threat_reports"][0].split("\t").length);
    console.info(this.scanReport["threat_reports"][0].split("\t"));
  }

}
