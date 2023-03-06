import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-binary-defence',
  templateUrl: './binary-defence.component.html',
  styleUrls: ['./binary-defence.component.css']
})
export class BinaryDefenceComponent implements OnInit {

  @Input()
  scanReport: Record<string, any> = {};

  constructor() { }

  ngOnInit(): void {
  }

}
