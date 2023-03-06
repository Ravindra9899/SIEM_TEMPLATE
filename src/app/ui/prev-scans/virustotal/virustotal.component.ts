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
  }

}
