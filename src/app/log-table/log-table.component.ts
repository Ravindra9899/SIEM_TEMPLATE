import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LogService } from '../services/log.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.css']
})
export class LogTableComponent implements OnInit, AfterViewInit {

  private records: any[] = [];
  displayedColumnNames: string[] = ['S.No', 'Log', 'Category'];
  displatedRecords: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(private service: LogService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

}
