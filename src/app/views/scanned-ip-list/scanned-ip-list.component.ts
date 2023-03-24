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
      language: {
        emptyTable: 'No data available in table',
        info: 'Showing _START_ to _END_ of _TOTAL_ entries',
        infoEmpty: 'Showing 0 to 0 of 0 entries',
        infoFiltered: '(filtered from _MAX_ total entries)',
        lengthMenu: 'Show _MENU_ entries',
        search: 'Search:',
        zeroRecords: 'No matching records found'
      },
      columns: [
        { title: 'IP Address', data: 'ipAddress' },
        { title: 'Scan Report ID', data: 'scanReportId' },
        { title: 'Created At', data: 'createdAt' },
        { title: 'Updated At', data: 'updatedAt' }
      ],
      order: [[2, 'asc']]
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

  }

  downloadRecordReport(record: Record<string, any>): void {

  }

  deleteRecordReport(record: Record<string, any>): void {

  }
}
