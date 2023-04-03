import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

import { ReaderService } from 'src/app/services/reader.service';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {

  @ViewChild('pdf-content')
  content!: ElementRef;

  ipAddress: string = "";

  countryCodes: any;
  asnIds: any;
  asnNames: any;
  regionalInternetRegistry: any;
  threatScore = "0";
  threatScores: Record<string, number> = {};

  isReportOpen = true;

  scanReports!: any[];

  constructor(
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private readerService: ReaderService
  ) { }

  ngOnInit(): void {
    this.ipAddress = this.route?.snapshot?.queryParamMap.get('ipAddress') || '';

    this.readerService.apiCallToGetSingleViewAsn(this.ipAddress).subscribe({
      next: (response) => {
        if (
          response['message'] == 'success' &&
          response['data'] != null
        ) {
          let data = response['data'];
          let asn_id = data['asn_id'];
          let countryCode = data['countryCode'];
          let regional_internet_registry = data['regional_internet_registry'];
          // console.log("bjvjhgjjhjh")
          // console.log(this.isAsnIdSame(asn_id)); // Output: true
          // console.log(this.isCountryCodeSame(countryCode)); // Output: false
          // console.log(this.isRegistrySame(regional_internet_registry)); // Output: true

          this.countryCodes = countryCode;
          this.asnIds = asn_id;
          this.asnNames = data['asn_name'];
          this.regionalInternetRegistry = regional_internet_registry;
        }
      },
      error: (err) => {
        console.error('Error in sending single view asn response ', err);
      },
      complete: () => {
        console.info('Single view ASN request completed');
      }
    });

    this.readerService.apiCallToGetThreatScore(this.ipAddress).subscribe({
      complete: () => {
        console.info("Request to get threat score completed");
      },
      error: (err) => {
        console.error("Error in threate score get request");
        console.error(err);
      },
      next: (response) => {
        if (
          response['message'] &&
          response['message'].trim() == 'success' &&
          response['data'] &&
          response['data'] != null
        ) {
          let data = response['data'];
          // console.log(data);
          if (
            typeof data == 'object' &&
            Array.isArray(data) == false &&
            data['threat_score'] &&
            data['threat_score'] != null &&
            Array.isArray(data) == false
          ) {

            this.threatScores = data['threat_score']
            this.finalThreatScore();
          }
        }
      }
    })

    this.readerService.apiCallToGetPrePrintScanReports(this.ipAddress).subscribe({
      complete: () => {
        console.info("Request to get print scan completed");
      },
      error: (err) => {
        console.error("Error in print score get request");
        console.error(err);
      },
      next: (response) => {
        console.log('pre-print process data');
        console.log(typeof response['data']);
        if (
          response &&
          response?.message == 'success' &&
          Array.isArray(response?.data)
        ) {
          this.scanReports = response['data'];
        }
      }
    });
  }

  isArray(arg0: any): any {
    return Array.isArray(arg0);
  }

  returnSetOfArray(array: any[]) {
    let set = new Set(array);
    return set;
  }

  // Returns true if all elements in the asn_id array are the same
  isAsnIdSame(asn_id: string[]): boolean {
    return asn_id.every(id => id === asn_id[0]);
  }

  // Returns true if all elements in the countryCode array are the same
  isCountryCodeSame(countryCode: string[]): boolean {
    return countryCode.every(code => code === countryCode[0]);
  }

  // Returns true if all elements in the regional_internet_registry array are the same
  isRegistrySame(regional_internet_registry: string[]): boolean {
    return regional_internet_registry.every(registry => registry === regional_internet_registry[0]);
  }

  finalThreatScore(): void {
    let tmp_score = 0;

    Object.entries(this.threatScores).forEach((entry) => {
      // console.log(entry);
      // console.log(typeof entry);

      tmp_score = tmp_score + entry[1];
    });

    // console.log(tmp_score);

    this.threatScore = tmp_score.toFixed(2);
  }

  whatColor() {
    // throw new Error('Method not implemented.');
    try {
      let score = parseFloat(this.threatScore);

      if (score > 8) {
        return 'critical';
      }
      else if (score >= 4 && score < 8) {
        return 'suspicious'
      }
      else {
        return 'clear';
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('parseFloat error ', error.message);
      }
      return 'suscpicious';
    }
  }

  print(): void {
    this.isReportOpen = true;
    setTimeout(() => {
      window.print();
      this.isReportOpen = false;
    }, 0);
  }


  getScanReport() {
    // throw new Error('Method not implemented.');
    return { "record": { "isThreat": false }, 'API_Name': 'Abuse IPDB' };
  }
  toggleCollapse() {
    this.isReportOpen = !this.isReportOpen; // toggle the boolean value
  }

}
