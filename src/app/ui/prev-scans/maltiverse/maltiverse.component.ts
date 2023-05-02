import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-maltiverse',
  templateUrl: './maltiverse.component.html',
  styleUrls: ['./maltiverse.component.css']
})
export class MaltiverseComponent implements OnInit {
  @Input()
  scanReport: Record<string, any> = {};

  constructor() { }

  ngOnInit(): void {
    console.log(typeof this.scanReport["blacklist"]);
    console.log(typeof this.scanReport["cidr"]);
    console.log(typeof this.scanReport["email"]);
    console.log(typeof this.scanReport["location"]);
  }

  isDictionary(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  showField(fieldName: string): boolean{
    if(
      this.scanReport!= null &&
      this.scanReport.hasOwnProperty(fieldName) &&
      this.scanReport[fieldName] != null
      ){
      return true;
    }
    return false;
  }
}
