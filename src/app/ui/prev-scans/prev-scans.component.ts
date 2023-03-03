import { Component, OnInit } from '@angular/core';
import { ScannerServiceService } from 'src/app/services/scanner-service.service';

@Component({
  selector: 'app-prev-scans',
  templateUrl: './prev-scans.component.html',
  styleUrls: ['./prev-scans.component.css']
})
export class PrevScansComponent implements OnInit {

  private allScannersList: string[] = [];
  public selectedScanner: string = "";

  public selectedIp: string = "8.8.8.8";

  public startDateUtc = new Date();
  public endDateUtc = new Date();

  private scanReport: Record<string, any> = {};

  constructor(
    private scanService: ScannerServiceService,
  ) { }

  showTable() : boolean{
    if(Object.keys(this.scanReport).length>0) return true;
    return false;
  }

  // define getter
  getAllScannersList(): string[] {
    return this.allScannersList;
  }

  getScanReport(): any {
    return this.scanReport;
  }

  // define setters
  setAllScannersList(): void {
    this.scanService.getAllScanners().subscribe(
      {
      error: (err) => {
        console.error("could not read scan report subscribe ", err);

      },
      complete: () => {
        console.info("Subscribe scan report completed")
      },
      next: (response) => {
        console.log("set all scanners subscribe",response["data"]);

        if(
          response &&
          response.hasOwnProperty("data") &&
          response['message'] != null &&
          response['message'] != false &&
          response['message'] == "success" &&
          response.hasOwnProperty("data") &&
          response['data'] != null &&
          response['data'] != false &&
          Array.isArray(response["data"])
        ){
          console.info("All Scanners are ", response["data"]);
          this.allScannersList = response["data"].map(scanner => scanner["API_Name"]);
        }
      }
    });
  }

  setSelectedScanner(selectedScannerOption: string): void {
    this.selectedScanner = selectedScannerOption;
  }

  setStartDate(duration: number): void {
    const startDateTimeStamp = this.startDateUtc.getTime() - (24 * 60 * 60 * 1000);
    this.startDateUtc = new Date(startDateTimeStamp)
  }

  setScanReport(): void {
    this.scanService.readScanReportsForIpAndApiDateRange(
      this.selectedIp,
      this.selectedScanner,
      this.startDateUtc.toISOString(),
      this.endDateUtc.toISOString(),
      "desc",
      "1",
      "0"
    ).subscribe({
      error: (err) => {
        console.error("could not read scan report subscribe ", err);

      },
      complete: () => {
        console.info("Subscribe scan report completed")
      },
      next: (response) => {
        console.warn(response &&
          Array.isArray(response["data"]));

          console.log(response["data"]);
        if (
          response &&
          response.hasOwnProperty("message") &&
          response['message'] != null &&
          response['message'] != false &&
          response['message'] == "success" &&
          response.hasOwnProperty("data") &&
          response['data'] != null &&
          response['data'] != false &&
          Array.isArray(response["data"]) &&
          response["data"].length > 0
        ) {
          this.scanReport = response["data"][0];
        } else {
          console.warn("subscribe scan report did not succeed");
        }
      }
    });
  }

  // define remover
  removeSelectedScanner(scannerOption: string): void {
    if (scannerOption == this.selectedScanner) {
      this.selectedScanner = "";
    }
  }

  onSubmit(): void{
    this.setScanReport();
  }

  ngOnInit(): void {
    this.setStartDate((24 * 60 * 60 * 1000));
    this.setAllScannersList();
  }
}
