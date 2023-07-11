import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../services/log.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

export interface DatasetRowElement {
  'id': string,
  'dataset': string
};

@Component({
  selector: 'app-dataset-tag-pattern',
  templateUrl: './dataset-tag-pattern.component.html',
  styleUrls: ['./dataset-tag-pattern.component.css']
})
export class DatasetTagPatternComponent implements OnInit, AfterViewInit {

  clickedDataset!: any;

  private records: any[] = [];
  displayedColumnNames: string[] = ['S.No.', 'Dataset', 'Actions'];
  displayedRecords: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild('paginator', {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  constructor(
    private service: LogService,
    private router: Router
  ) { }

  getRecords() {
    return this.records;
  }

  /**
   * The function "processRecordsForDisplay" takes an array of records, assigns an ID to each record,
   * and creates a new array of dataset rows with the assigned IDs.
   */
  processRecordsForDisplay(): void {
    let tmp: DatasetRowElement[] = [];

    for (let i = 0;i < this.records.length;i++){
      let record = this.records[i];
      const id = i + 1;
      const dataset = record['dataset'];

      const newRow: DatasetRowElement = {
        'id': id.toString(),
        'dataset': dataset
      }

      tmp.push(newRow);
    }

    this.displayedRecords.data = tmp;
  }

  /**
   * The ngOnInit function retrieves dataset records from a service and processes them for display.
   */
  ngOnInit(): void {
    let tmpRec: any[] = [];

    this.service.getAllDataset().subscribe({
      next: (response) => {
        console.info('getAllDataset service subscribed');
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
          for(let i = 0;i < response.data.length;i++){
            let tmp = {
              'dataset': response.data[i]['name']
            }
            tmpRec.push(tmp);
          }
          this.records = tmpRec;
          this.processRecordsForDisplay();
        } else {
          console.log(typeof response);
          console.error("message", response['message']);
          console.log(typeof response['data']);
          console.error('response was undefined');
        }
      },
      error: (err) => {
        console.error('getAllDataset service subscribe error');
        console.error(err);
      },
      complete: () => {
        console.info('getAllDataset service subscribe complete');
      }
    });
  }

  ngAfterViewInit(): void {
    if(this.paginator) {
      this.displayedRecords.paginator = this.paginator;
    }

    if(this.sort){
      this.displayedRecords.sort = this.sort;
    }
  }

  /**
   * The function "viewDataset" logs the record parameter and navigates to a specific route with the
   * record as a query parameter.
   * @param {any} record - The `record` parameter is an object that represents a dataset. It contains
   * information about the dataset that will be used to navigate to the `dataset-tag-pattern-view`
   * route.
   */
  viewDataset(record: any){
    console.log("record ", record);
    this.router.navigate(
      ['/dataset-tag-pattern-view'],
      {queryParams: record}
    )
  }
}
