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


  constructor(
    private scanService: ScannerServiceService
    ) { }

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
        this.scanStarted = true;
        
        for(let apiName of this.selectedScanners){
          let scanStatus = new Subject<string>();

          let scanIndex = this.selectedScanners.indexOf(apiName) + 1;
          let N = this.selectedScanners.length;

          console.log("started scan ", `${scanIndex}/${N}`);          
          console.log(apiName);

          this.scanService
          .getIpScanResponse(
            this.ipAddress, apiName, 
            this.selectedScanners.length,
            scanIndex,
            scanStatus,
            )
          .subscribe(
            {
              next: (response) => {
                    console.log("scan status subscribe " + response);
                    // scanStatus.next(`Processing response ${scanIndex}/${N}`);
                    console.log(response);

                    if(
                      response.hasOwnProperty("message") &&
                      response.hasOwnProperty("infoText") &&
                      response.hasOwnProperty("data") &&
                      response["message"] != null &&
                      response["message"] != false && 
                      response["message"] != "" &&
                      response["infoText"] != null &&
                      response["infoText"] != false && 
                      response["infoText"] != "" &&
                      response["data"] != null &&
                      response["data"] != false && 
                      response["data"] != "" &&
                      response["message"].toString().toLowerCase() == "success" &&
                      response["infoText"].toString().toLowerCase() == "success" &&
                      response["data"].toString().toLowerCase() == "success" 
                    ){
                      this.scanReportStatus[apiName] = response['data'].toString();
                      this.scanReport[apiName] = response['data'].toString();
                    }else{
                      console.log("Problem processing the reply for scan for scanner ", apiName);
                      this.scanReportStatus[apiName] = "";
                      this.scanReport[apiName] = "";
                    }
                    
                  },
                  error: (error) => {
                    console.error('An error occurred during scan for scanner ', apiName, " ", error);
                    this.scanReportStatus[apiName] = "";
                      this.scanReport[apiName] = "";
                  },
                  complete: () => {
                    console.log("Completed ", `${scanIndex}/${N}`)
                  }
            }
          );
          scanStatus.subscribe(
            (status)=>{
              console.log("scanStatus");
              console.log(status);
              this.scanProgress = status;
            }
          );
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
