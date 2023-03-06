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
  }

}
