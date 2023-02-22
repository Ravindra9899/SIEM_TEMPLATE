import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScannerServiceService } from 'src/app/services/scanner-service.service';

@Component({
  selector: 'app-scan-report',
  templateUrl: './scan-report.component.html',
  styleUrls: ['./scan-report.component.css']
})
export class ScanReportComponent implements OnInit {

  public apiName: string = "";
  public scanReports: any;
  limit: string = "1";
  skip: string = "0";
  order: string = "desc";
  public ipAddress: string = "";

  constructor(private scanService: ScannerServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.ipAddress = this.route.snapshot.queryParamMap.get("ipAddress")!;


    this.apiName = this.route.snapshot.queryParamMap.get("apiName")!;
    this.order = this.route.snapshot.queryParamMap.get("order")!;
    this.limit = this.route.snapshot.queryParamMap.get("limit")!;
    this.skip = this.route.snapshot.queryParamMap.get("skip")!;


    this.scanService.readAllScanReportsForApi(this.apiName, this.skip, this.limit, this.order).subscribe({
      error: (err) => {
        console.log("Error is fetching scan report from backend");
      },
      next: (response) => {
        console.log("fetched response successfully");
        if (
          response.hasOwnProperty("message") && response["message"] != null && response["message"] != false &&
          response.hasOwnProperty("data") && response["data"] != null && response["data"] != false
        ) {
          console.log("scan report is received");
          console.log(response["data"]);
          this.scanReports = response["data"];
        } else {
          console.log("scan response else");
        }
      },
      complete: () => {
        console.log("scan report fetch completed");
      }
    });
  }

  getStringifiedOutput(scanReport: any){
    return JSON.stringify(scanReport, null, 2);
  }
}
