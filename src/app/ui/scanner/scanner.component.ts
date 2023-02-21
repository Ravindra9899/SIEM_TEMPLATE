import { Component, OnInit } from '@angular/core';
import { ScannerServiceService } from '../../services/scanner-service.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  public ipAddress: string = "";
  private scanOptions: string[] = [];
  private apiUsed: Record<string, boolean> = {};

  constructor(private scanService: ScannerServiceService) { }

  ngOnInit(): void {
    this.setScanOptions();

    console.log(this.getScanOptions());
    console.log(this.apiUsed);
  }

  markOptionChange(scanOptionName: string) {
    if (this.apiUsed[scanOptionName] != null) {
      this.apiUsed[scanOptionName] = !this.apiUsed[scanOptionName];
    }

    console.log("changed " + scanOptionName + " " + this.apiUsed[scanOptionName]);
  }

  isChecked(scanOptionName: string) {
    if (this.apiUsed[scanOptionName] != null) {
      return this.apiUsed[scanOptionName];
    } else {
      return false;
    }
  }

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

  isValidIPv4() {
    let regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(this.ipAddress);
  }

  startScan() {
    console.log(`this ${this.ipAddress}`)
    if (this.isValidIPv4() && this.isValidIp()) {

    } else {
      // show error message
    }

  }

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
              this.apiUsed[label] = true;
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

  getScanOptions() {
    return this.scanOptions;
  }

  vtScanProcessor() {
  }
}
