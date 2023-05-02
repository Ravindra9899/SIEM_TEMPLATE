import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ReaderService } from 'src/app/services/reader.service';

import { IpListService } from 'src/app/services/views/ip-list.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

export interface ScanElement {
  id: string,
  ipAddress: string,
  createdAt: string,
  updatedAt: string
};

@Component({
  selector: 'app-scanned-ip-list',
  templateUrl: './scanned-ip-list.component.html',
  styleUrls: ['./scanned-ip-list.component.css']
})
export class ScannedIpListComponent implements OnInit, AfterViewInit {

  private records: any[] = [];
  displayedColumnNames = ['S.No', 'Target IP Address', 'Scanned On', 'Updated On', 'Actions'];
  displayedRecords = new MatTableDataSource<any>([]);

  @ViewChild('paginator', { static: false }) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  constructor(
    private ipListService: IpListService,
    private readerService: ReaderService,
    private router: Router

  ) {
    console.clear();
  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    console.log("getting this.paginator");
    console.log(this.paginator);
    if (this.paginator) {
      this.displayedRecords.paginator = this.paginator;
    }

    console.log('getting this.sort')
    console.log(this.sort);
    if (this.sort) {
      this.displayedRecords.sort = this.sort;
    }
  }

  getRecords(): any[] {
    return this.records;
  }

  processRecordsForDisplay(): void {
    if (this.records.length > 0) {
      let tmp: ScanElement[] = [];
      for (let i = 0; i < this.records.length; i++) {
        let record = this.records[i];

        let id = i + 1;
        let ipAddress = record['ipAddress'] || '';
        let createdAt = record['createdAt'] || '';
        let updatedAt = record['updatedAt'] || '';

        // if (ipAddress) {
        const newRow: ScanElement = {
          id: id.toString(),
          ipAddress: ipAddress,
          createdAt: createdAt,
          updatedAt: updatedAt
        };

        tmp.push(newRow);
        // }
      }

      this.displayedRecords.data = tmp;

      console.log("here");
      console.log('this paginator')
      console.log(this.paginator);

      console.log('this sort')
      console.log(this.sort);
      console.log('this displayrecords')
      console.log(this.displayedRecords.sort);
      console.log(this.displayedRecords.paginator);
    }
  }

  ngOnInit(): void {

    console.clear();

    this.ipListService
      .getMostRecentlyScannedIpList()
      .subscribe(
        {
          next: (response) => {
            console.log('response received scanned ip list');
            console.log(response['data'])
            console.log(typeof response['data']);

            if (
              response.message?.toLowerCase() === 'success' &&
              response.infoText?.toLowerCase() === 'success' &&
              Array.isArray(response.data)
            ) {
              this.records = response['data'];

              this.processRecordsForDisplay();
            }
          },
          error: (err) => {
            console.error(`scanned ip list error ${err}`);
          },
          complete: () => {
            console.log("Scanned IP List request completed");
          },
        }
      );
  }

  viewRecordReport(record: Record<string, any>): void {
    // console.log("the record view ", this.records.indexOf(record));

    let ipAddress = record['ipAddress'];
    // console.log(record);
    console.log("ghhghghfg", ipAddress);

    // this.readerService.apiCallToGetSingleView()
    this.router.navigate(['/single-view', ipAddress])

  }

  async generatePdf(ipAddress: string) {
    console.log('Calling View Service');

    this.readerService.apiCallToPrintScanReport(ipAddress).subscribe(
      {
        next: (response: Blob) => {
          // console.log(response.hasOwnProperty['headers'])
          console.log(response)
          // Handle the response here
          let fileName = 'Scan-Report-' + `${ipAddress}.pdf`;
          // Create a URL for the Blob object
          const url = URL.createObjectURL(response);

          // Open a new window or tab with the new URL
          const newWindow = window.open(url, '_blank');

          // Clean up the URL object
          URL.revokeObjectURL(url);

        },
        error: (error) => {
          // Handle the error here
          console.error('An error occurred:', error);
          // Display an error message to the user
          alert('Failed to retrieve PDF file: ' + error.message);
        }
      }
    );
  }

  async downloadPdf(ipAddress: string) {
    console.log('Calling download Service');

    this.readerService.apiCallToPrintScanReport(ipAddress).subscribe(
      {
        next: (response: Blob) => {
          // console.log(response.hasOwnProperty['headers'])
          console.log(response)
          // Handle the response here
          let fileName = 'Scan-Report-' + `${ipAddress}.pdf`;
          // Create a URL for the Blob object
          const url = URL.createObjectURL(response);

          // Create an anchor element and set its href attribute to the URL
          const a = document.createElement('a');
          a.href = url;
          // Set the anchor element's download attribute to the file name
          a.download = fileName;
          // Trigger a click event on the anchor element to download the file
          a.click();
          // Clean up the URL object
          URL.revokeObjectURL(url);

        },
        error: (error) => {
          // Handle the error here
          console.error('An error occurred:', error);
          // Display an error message to the user
          alert('Failed to retrieve PDF file: ' + error.message);
        }
      }
    );
  }
}
