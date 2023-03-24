import { Component, AfterViewInit } from '@angular/core';
import { IpListService } from 'src/app/services/views/ip-list.service';

@Component({
  selector: 'app-scanned-ip-list',
  templateUrl: './scanned-ip-list.component.html',
  styleUrls: ['./scanned-ip-list.component.css']
})
export class ScannedIpListComponent implements AfterViewInit {

  private records: any[] = [];

  constructor(private ipListService: IpListService) { }

  ngAfterViewInit(): void {

    this.ipListService
      .getMostRecentlyScannedIpList()
      .subscribe({
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
      });
  }
}
