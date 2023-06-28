import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../services/log.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  private records: any[] = [];
  displayedColumnNames: string[] = ['S.No.', 'Dataset', 'Actions'];
  displayedRecords: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild('paginator', {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  constructor() { }

  getRecords() {
    return this.records;
  }

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

  ngOnInit(): void {
    let tmpRec = [];
    for(let i = 0;i < 500;i++){
      let tmp = {
        'dataset': "dataset-"+i
      }

      tmpRec.push(tmp);
    }

    this.records = tmpRec;
    this.processRecordsForDisplay();
  }

  ngAfterViewInit(): void {
    if(this.paginator) {
      this.displayedRecords.paginator = this.paginator;
    }

    if(this.sort){
      this.displayedRecords.sort = this.sort;
    }
  }

  viewDataset(record: any){

  }

  editDataset(record: any){

  }

  deleteDataset(record: any){

  }

}
