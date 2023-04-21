import { Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ReaderService } from 'src/app/services/reader.service';

import { IpListService } from 'src/app/services/views/ip-list.service';

@Component({
  selector: 'app-scanned-ip-list',
  templateUrl: './scanned-ip-list.component.html',
  styleUrls: ['./scanned-ip-list.component.css']
})
export class ScannedIpListComponent implements OnInit, OnDestroy {

  // @ViewChild(DataTableDirective, { static: true })
  // datatableElement!: DataTableDirective;

  @Input() tableData!: any[];
  @ViewChild(DataTableDirective, { static: false }) datatableElement!: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  private singleViewUrl = '/single-view?ipAddress=';

  private records: any[] = [];

  constructor(
    private ipListService: IpListService,
    private readerService: ReaderService
  ) { }

  getRecords(): any[] {
    return this.records;
  }

  ngOnInit(): void {

    console.clear();

    this.ipListService
      .getMostRecentlyScannedIpList()
      .subscribe(
        {
          next: (response) => {
            console.log('response received scanned ip list');
            console.log(response['message'])
            console.log(typeof response['data']);

            if (
              response.message?.toLowerCase() === 'success' &&
              response.infoText?.toLowerCase() === 'success' &&
              Array.isArray(response.data)
            ) {
              this.records = response['data'];
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

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      lengthChange: true,
      jQueryUI: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search...',
        lengthMenu: 'Show _MENU_ records',
      }
    };

    $(document).ready(function () {
      let variable = $('#example').DataTable({
        responsive: true
      })
    });
  }

  viewRecordReport(record: Record<string, any>): void {
    console.log("the record view ", this.records.indexOf(record));

    this.downloadPdf(record['ipAddress']);
  }

  // async generatePdf(ipAddress: string) {
  //   console.log('Calling View Service');

  //   this.readerService.apiCallToPrintScanReport(ipAddress).subscribe(
  //     {
  //       next: (response: Blob) => {
  //         // console.log(response.hasOwnProperty['headers'])
  //         console.log(response)
  //         // Handle the response here
  //         let fileName = 'Scan-Report-' + `${ipAddress}.pdf`;
  //         // Create a URL for the Blob object
  //         const url = URL.createObjectURL(response);

  //         const newUrl = url + `?fileName=${fileName}`;
  //         // Open a new window or tab with the new URL
  //         const newWindow = window.open(newUrl, '_blank');

  //         // Clean up the URL object
  //         URL.revokeObjectURL(url);

  //       },
  //       error: (error) => {
  //         // Handle the error here
  //         console.error('An error occurred:', error);
  //         // Display an error message to the user
  //         alert('Failed to retrieve PDF file: ' + error.message);
  //       }
  //     }
  //   );
  // }

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


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
