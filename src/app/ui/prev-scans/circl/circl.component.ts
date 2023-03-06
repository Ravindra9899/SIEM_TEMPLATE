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
  }

}
