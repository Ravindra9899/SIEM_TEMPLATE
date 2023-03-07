import { Component, OnInit } from '@angular/core';
import { ScannerServiceService } from 'src/app/services/scanner-service.service';

@Component({
  selector: 'app-prev-scans',
  templateUrl: './prev-scans.component.html',
  styleUrls: ['./prev-scans.component.css']
})
export class PrevScansComponent implements OnInit {

  private allScannersList: string[] = [];
  public selectedScanner: string = "Virus Total";

  //bruteforce blocker report 195.133.40.71
  public selectedIp: string = "8.8.8.8";

  public startDateUtc = new Date();
  public endDateUtc = new Date();

  private scanReport: Record<string, any> = {};

  private mostRecent: boolean = true;

  constructor(
    private scanService: ScannerServiceService,
  ) { }

  showTable() : boolean{
    if(Object.keys(this.scanReport).length>0) return true;
    return false;
  }

  /**
   * The function returns true if the IP address is valid, and false if it is not
   * @returns A boolean value.
   */
  isValidIPv4() {
    let regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(this.selectedIp);
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
    const startDateTimeStamp = this.startDateUtc.getTime() - duration;
    this.startDateUtc = new Date(startDateTimeStamp)
  }

  setScanReport(): void {
    if(this.isValidIPv4()){
      this.scanService.readScanReportsForIpAndApiDateRange(
        this.selectedIp,
        this.selectedScanner,
        this.startDateUtc.toISOString(),
        this.endDateUtc.toISOString(),
        "desc",
        "1",
        "0",
        this.mostRecent
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
  
            console.log(typeof response["data"]);
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
    }else{
      window.alert("Please enter a valid IPv4 address");
    }
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
