import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ScannerServiceService } from '../../services/scanner-service.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  public ipAddress: string = "";
  private scanOptions: string[] = [];
  private apiMap: Record<string, boolean> = {};

  private scanStarted: boolean = false;
  public scanProgress: string = "";
  public selectedScanners: string[] = [];
  public scanReportStatus: Record<string, string>= {};
  public scanReport: Record<string, any>= {};

  public limit: string = "1";
  public skip: string = "0";
  public order: string = "desc";


  constructor(private scanService: ScannerServiceService) { }

  ngOnInit(): void {
    this.setScanOptions();

    console.log(this.getScanOptions());
    console.log(this.apiMap);
  }

  /**
   * If the scan option is not null, then toggle the value of the scan option
   * @param {string} scanOptionName - The name of the scan option that was changed.
   */
  markOptionChange(scanOptionName: string) {
    if (this.apiMap[scanOptionName] != null) {
      this.apiMap[scanOptionName] = !this.apiMap[scanOptionName];
    }

    console.log("changed " + scanOptionName + " " + this.apiMap[scanOptionName]);
  }

  /**
   * If the scanOptionName is in the apiMap object, return the value of that key, otherwise return
   * false
   * @param {string} scanOptionName - The name of the scan option.
   * @returns The value of the apiMap property of the object that is being passed in.
   */
  isChecked(scanOptionName: string) {
    if (this.apiMap[scanOptionName] != null) {
      return this.apiMap[scanOptionName];
    } else {
      return false;
    }
  }

  /**
   * This function returns a boolean value that indicates whether the scan has started or not
   * @returns The value of the scanStarted property.
   */
  isScanStarted(){
    return this.scanStarted;
  }

  /* Checking if the IP address is valid or not. */
  isValidIp() {
    const blocks = this.ipAddress.split('.');
    if (blocks.length !== 4) {
      return false;
    }
    for (const block of blocks) {
      if (isNaN(Number(block)) || Number(block) < 0 || Number(block) > 255) {
        return false;
      }
    }
    return true;
  }

  /**
   * The function returns true if the IP address is valid, and false if it is not
   * @returns A boolean value.
   */
  isValidIPv4() {
    let regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(this.ipAddress);
  }

  /**
   * It gets all the active scanners from the server and stores them in the scanOptions array
   */
  setScanOptions() {
    this.scanService.getAllActiveScanners().subscribe({
      "next": (response) => {
        console.log("Response: ", response);
        if (response.hasOwnProperty("message") &&
          response.hasOwnProperty("infoText") &&
          response.hasOwnProperty("data") &&
          response["message"].toString() == "success" &&
          response["data"] != null) {
          this.scanOptions = response["data"];
          console.log("Active scanners :", this.scanOptions);

          if (this.scanOptions.length > 0) {
            for (const label of this.scanOptions) {
              this.apiMap[label] = true;
            }
          }

          console.log(this.scanOptions);
        }
      },
      "error": (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }

  /**
   * It returns the scanOptions object.
   * @returns The scanOptions object.
   */
  getScanOptions() {
    return this.scanOptions;
  }

  /**
   * It takes the selected scanners from the checkboxes, and calls the respective API's to get the scan
   * results
   */
  startScan() {
    console.log(`this ${this.ipAddress}`);
    if (this.isValidIPv4() && this.isValidIp()) {

      // get a list of all selected scanners

      this.selectedScanners = Object.keys(this.apiMap).filter((element, index, array)=>
        this.apiMap[element] == true
      );

      if(this.selectedScanners.length>0){
        const scanStatus = new Subject<string>();
        this.scanStarted = true;
        if (this.selectedScanners.includes("Virus Total")){
          console.log("scan vt");
          // call vt scan method here and with proper scan status
          this.scanService.getVirusTotalResponse(this.ipAddress, this.selectedScanners.length, scanStatus).subscribe({
            next: (response) => {
              console.log('Response received:', response);

              if(response.hasOwnProperty("message") && response['message']!=null && response["message"]=="success" &&
              response.hasOwnProperty("data") && response['data'] != null 
              ){
                this.scanReportStatus["Virus Total"] = "Done";
                this.scanReport["Virus Total"] = response.data;
              }else{
                this.scanReportStatus["Virus Total"] = "Done";
                this.scanReport["Virus Total"] = "";
              }
            },
            error: (err) => {
              console.error('Error occurred:', err);
              this.scanReportStatus["Virus Total"] = "Failed";
            },
            complete: () => {
              console.log('Request completed');
            },
          });

          scanStatus.subscribe((status)=>{
            console.log("scanStatus");
            console.log(status);
            this.scanProgress = status;
          });
        }
  
        if (this.selectedScanners.includes("API 1")){
          console.log("scan 1");
        }
  
        if (this.selectedScanners.includes("API 3")){
          console.log("scan 2");
        }
  
        if (this.selectedScanners.includes("API 3")){
          console.log("scan 3");
        }
  
        if (this.selectedScanners.includes("API 4")){
          console.log("scan 4");
        }
  
      }else{
        console.error("Please select at least one scanner");
      }

    } else {
      // show error message
      console.error("Scanner error");
    }
  }

  viewReport(apiName: string){

    console.log(this.scanReport[apiName]);

    let viewReportURL = `/view-report?ipAddress=${this.ipAddress}&apiName=${apiName}&order=${this.order}&skip=${this.skip}&limit=${this.limit}`;

    window.open(viewReportURL, "_blank");

  }
}
