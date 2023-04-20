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

    this.generatePdf(record['ipAddress']);
  }

  // downloadRecordReport(record: Record<string, any>): void {
  //   console.log("the record download ", this.records.indexOf(record));
  // }

  // deleteRecordReport(record: Record<string, any>): void {
  //   console.log("the record delete ", this.records.indexOf(record));
  // }

  async generatePdf(ipAddress: string) {
    console.log('Calling Service');

    this.readerService.apiCallToPrintScanReport(ipAddress).subscribe({
      complete: () => {
        console.log('request to print detailed report complete');
      },
      error: (err) => {
        console.error('Error occurred in printing detailed report');
        console.error(err)
      },
      next: (response: Blob) => {
        console.log("response print received",);

        if (response && response != null && response.size != 0) {
          const fileURL = URL.createObjectURL(response);
          window.open(fileURL);
        } else {
          window.alert('The download of report failed. Please try again later');
        }
      },
    });

  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['record']) {
  //     if (this.datatableElement && this.datatableElement.dtInstance) {
  //       this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //         dtInstance.destroy();
  //         this.dtTrigger.next();
  //       });
  //     }
  //   }
  // }
}
