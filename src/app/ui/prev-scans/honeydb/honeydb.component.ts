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
  }

}
