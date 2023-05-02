import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-botvij',
  templateUrl: './botvij.component.html',
  styleUrls: ['./botvij.component.css']
})
export class BotvijComponent implements OnInit {

  @Input()
  scanReport: Record<string, any> = {};

  constructor() { }

  ngOnInit(): void {
  }

}
