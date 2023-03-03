import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-abuse-ipdbrecord-table',
  templateUrl: './abuse-ipdbrecord-table.component.html',
  styleUrls: ['./abuse-ipdbrecord-table.component.css']
})
export class AbuseIPDBRecordTableComponent implements OnInit {

  @Input()
  scanReport: Record<string, any> = {};

  ngOnInit(): void {
  }

}
