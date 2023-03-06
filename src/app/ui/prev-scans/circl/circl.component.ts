import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circl',
  templateUrl: './circl.component.html',
  styleUrls: ['./circl.component.css']
})
export class CirclComponent implements OnInit {

  @Input()
  scanReport: Record<string, any> = {};

  constructor() { }

  ngOnInit(): void {
    console.log(typeof this.scanReport)
  }

  showAsnFromIPResponse(): any {
    if(
      this.scanReport["ASN From IP"] != null &&
      this.scanReport["ASN From IP"]["response"] != null &&
      Object.keys(this.scanReport["ASN From IP"]["response"]).length != 0 
    ){
      return true;
    }
    return false;
  }

  getAsnFromIpResponseKeys(){
    return Object.keys(this.scanReport["ASN From IP"]["response"]);
  }

  showAsnRanking(): any {

    if(
      this.scanReport["ASN Ranking"] != null &&
      this.scanReport["ASN Ranking"]["response"] != null &&
      Object.keys(this.scanReport["ASN Ranking"]["response"]).length != 0 
    ){
      return true;
    }
    return false;
  }
}
