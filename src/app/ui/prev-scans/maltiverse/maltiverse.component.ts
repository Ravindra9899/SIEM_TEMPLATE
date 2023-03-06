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
  }

}
