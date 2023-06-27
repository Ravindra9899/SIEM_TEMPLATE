import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../services/log.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface LogRowElement {
  'id': string,
  'key': string,
  'count': number,
  'dataset': string,
};

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.css']
})
export class LogTableComponent implements OnInit, AfterViewInit {

  private records: any[] = [];
  displayedColumnNames: string[] = ['S.No.', 'Log', 'Count', 'Dataset'];
  displayedRecords: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild('paginator', { static: false }) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private service: LogService
  ) { }

  getRecords() {
    return this.records;
  }


  processRecordsForDisplay(): void {
    let tmp: LogRowElement[] = [];

    for (let i = 0; i < this.records.length; i++) {
      let record = this.records[i];
      const id = i + 1;
      const key = record['key'].toString();
      const count = record['doc_count'] ?? 0;
      var dataset = 'N.A.';



      const newRow: LogRowElement = {
        'id': id.toString(),
        'key': key,
        'count': count,
        'dataset': dataset
      };

      // if (i == 0) {
      this.service.getDatasetNameForLog(key).subscribe({
        next: (value) => {
          console.log('match pattern ', value);
          newRow['dataset'] = value;
        },
        error: (error) => {
          console.log('error ', error);
        },
        complete: () => {
          console.log('completed')
        }
      });
      // }

      tmp.push(newRow);
    }



    this.displayedRecords.data = tmp;
    console.info('here');

  }

  ngOnInit(): void {
    console.clear();

    this.service.getAllDocCount().subscribe({
      next: (response) => {
        console.info('getAllCount service subscribed');
        if (
          response &&
          response != null &&
          response['message'] &&
          response['message'] != null &&
          response['message'].toString().toLowerCase() == 'success' &&
          response['data'] != null &&
          Array.isArray(response['data']) &&
          response['data'].length > 0
        ) {
          console.log(response['message']);
          console.log(response['data'][0]);
          this.records = response.data;
          this.processRecordsForDisplay();
        } else {
          console.log(typeof response);
          console.error("message", response['message']);
          console.log(typeof response['data']);
          console.error('response was undefined');
        }
      },
      error: (err) => {
        console.error('getAllDocCount service subscribe error');
        console.error(err);
      },
      complete: () => {
        console.info('getAllDocCount service subscribe complete');
      }
    });
  }

  ngAfterViewInit(): void {
    console.log("getting this.paginator");

    // for (let i = 0; i<)
    // console.log(this.paginator);
    if (this.paginator) {
      this.displayedRecords.paginator = this.paginator;
    }

    console.log('getting this.sort')
    // console.log(this.sort);
    if (this.sort) {
      this.displayedRecords.sort = this.sort;
    }
  }

}
