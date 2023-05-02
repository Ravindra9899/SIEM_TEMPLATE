import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cins',
  templateUrl: './cins.component.html',
  styleUrls: ['./cins.component.css']
})
export class CinsComponent implements OnInit {
  @Input()
  scanReport: Record<string, any> = {};

  constructor() { }

  ngOnInit(): void {
    console.log(this.scanReport);
  }

}
