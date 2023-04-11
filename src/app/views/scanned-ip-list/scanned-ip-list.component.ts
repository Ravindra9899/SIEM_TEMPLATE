import { Component, OnDestroy, OnInit } from '@angular/core';

import { IpListService } from 'src/app/services/views/ip-list.service';

@Component({
  selector: 'app-scanned-ip-list',
  templateUrl: './scanned-ip-list.component.html',
  styleUrls: ['./scanned-ip-list.component.css']
})
export class ScannedIpListComponent implements OnInit, OnDestroy {

  // @ViewChild(DataTableDirective, { static: true })
  // datatableElement!: DataTableDirective;
  dtOptions: any = {};
  // dtTrigger: Subject<any> = new Subject();

  private singleViewUrl = '/single-view?ipAddress=';

  private records: any[] = [];

  constructor(private ipListService: IpListService) { }

  getRecords(): any[] {
    return this.records;
  }

  ngOnInit(): void {

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
        emptyTable: '',
        info: 'Showing _START_ to _END_ of _TOTAL_ entries',
        // infoEmpty: 'Showing 0 to 0 of 0 entries',
        infoEmpty: '',
        lengthMenu: 'Show _MENU_ records',
        // lengthMenu: '',
        search: '_INPUT_',
        searchPlaceholder: 'Search...',
        zeroRecords: ''
      },
    };

    $(document).ready(function () {
      let variable = $('#example').DataTable({
        responsive: true
      })
    });
  }

  viewRecordReport(record: Record<string, any>): void {
    console.log("the record view ", this.records.indexOf(record));

    this.singleViewUrl = this.singleViewUrl + record['ipAddress'];

    window.open(this.singleViewUrl, '_blank');
  }

  downloadRecordReport(record: Record<string, any>): void {
    console.log("the record download ", this.records.indexOf(record));


  }

  deleteRecordReport(record: Record<string, any>): void {
    console.log("the record delete ", this.records.indexOf(record));
  }


  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

}
