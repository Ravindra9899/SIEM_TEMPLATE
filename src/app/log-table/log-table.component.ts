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


  /**
   * The function `processRecordsForDisplay` processes records and updates the dataset field if it is
   * empty by making a service call to get the dataset name.
   */
  processRecordsForDisplay(): void {
    let tmp: LogRowElement[] = [];

    for (let i = 0; i < this.records.length; i++) {
      let record = this.records[i];
      const id = i + 1;
      const key = record['key'].toString();
      const count = record['doc_count'] ?? 0;
      var dataset = '';

      const newRow: LogRowElement = {
        'id': id.toString(),
        'key': key,
        'count': count,
        'dataset': dataset
      };
      tmp.push(newRow);
    }

    this.records = tmp;
    this.displayedRecords.data = this.records;

    for(let i=0; i<this.records.length; i++){
      console.log(this.records[i]);
      // const key = this.records[i].key;
      // console.info("::: ",key);
      console.log(this.records[i]['dataset'].toString().trim()=='')
      if(this.records[i]['dataset'].toString().trim()==''){
        this.service.getDatasetNameForLog(this.records[i].key).subscribe({
          next: (response) => {
            console.info('getDatasetNameForLog service subscribed');
            if (
              response &&
              response != null &&
              response['message'] &&
              response['message'] != null &&
              response['message'].toString().toLowerCase() == 'success' &&
              response['data'] != null
            ) {
              console.log(response['message']);
              this.records[i]['dataset'] = response['data'];
            } else {
              if(
                response['message'] &&
                response['message'] != null &&
                response['message'].toString().trim()=='not found'
                ){
                  this.records[i]['dataset'] = 'N.A.';
              }
            }
          },
          error: (err) => {
            console.error('getDatasetNameForLog service subscribe error');
            console.error(err);
          },
          complete: () => {
            console.info('getDatasetNameForLog service subscribe complete');
          }
        });
      }
    }

    this.displayedRecords.data = this.records;
    console.info('here');
  }

  /**
   * The `ngOnInit()` function subscribes to the `getAllDocCount()` method of the `LogService` and
   * handles the response by logging the data and error messages, and then processes the records for
   * display.
   */
  ngOnInit(): void {
    console.clear();

    /* The code snippet is subscribing to the `getAllDocCount()` method of the `LogService` and
    handling the response using the `subscribe()` method. */
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
          // console.log(response['message']);
          console.log(response['data'][0]);
          this.records = response.data;
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
        this.processRecordsForDisplay();
      }
    });
  }

  /**
   * The ngAfterViewInit function sets the paginator and sort properties of the displayedRecords object
   * if they exist.
   */
  ngAfterViewInit(): void {
    console.log("getting this.paginator");

    if (this.paginator) {
      this.displayedRecords.paginator = this.paginator;
    }

    console.log('getting this.sort')
    if (this.sort) {
      this.displayedRecords.sort = this.sort;
    }
  }
}
