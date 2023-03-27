import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


import { IpListService } from 'src/app/services/views/ip-list.service';

@Component({
  selector: 'app-scanned-ip-list',
  templateUrl: './scanned-ip-list.component.html',
  styleUrls: ['./scanned-ip-list.component.css']
})
export class ScannedIpListComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: true })
  datatableElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  private records: any[] = [];

  constructor(private ipListService: IpListService) { }

  getRecords(): any[] {
    return this.records;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      lengthChange: true,
      jQueryUI: true,
      language: {
        // emptyTable: 'No data available in table',
        // info: 'Showing _START_ to _END_ of _TOTAL_ entries',
        // infoEmpty: 'Showing 0 to 0 of 0 entries',
        // infoFiltered: '(filtered from _MAX_ total entries)',
        lengthMenu: 'Show _MENU_ records',
        search: '_INPUT_',
        searchPlaceholder: 'Search...',
        // zeroRecords: 'No matching records found'
      },
      order: [[2, 'asc']],
      dom: 'Bfrtip',
      // buttons: [
      //   'copy', 'csv', 'excel', 'pdf', 'print'
      // ]
    };
  }

  ngAfterViewInit(): void {
    this.ipListService
      .getMostRecentlyScannedIpList()
      .subscribe(
        {
          next: (response) => {
            console.log('response received scanned ip list');
            console.log(response);

            if (
              response.message?.toLowerCase() === 'success' &&
              response.infoText?.toLowerCase() === 'success' &&
              Array.isArray(response.data)
            ) {
              this.records = response['data'];
              // this.dtTrigger.next();
              this.rerenderDatatable();
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

  rerenderDatatable(): void {
    if (this.datatableElement && this.datatableElement.dtInstance) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }
  }

  viewRecordReport(record: Record<string, any>): void {
    console.log("the record view ", this.records.indexOf(record));

  }

  downloadRecordReport(record: Record<string, any>): void {
    console.log("the record download ", this.records.indexOf(record));


  }

  deleteRecordReport(record: Record<string, any>): void {
    console.log("the record delete ", this.records.indexOf(record));
  }
}
