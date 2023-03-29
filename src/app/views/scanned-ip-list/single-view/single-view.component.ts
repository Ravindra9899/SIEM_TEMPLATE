import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReaderService } from 'src/app/services/reader.service';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {

  ipAddress: string = "";

  countryCodes: any;
  asnIds: any;
  asnNames: any;
  regionalInternetRegistry: any;

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
          console.log("bjvjhgjjhjh")
          console.log(this.isAsnIdSame(asn_id)); // Output: true
          console.log(this.isCountryCodeSame(countryCode)); // Output: false
          console.log(this.isRegistrySame(regional_internet_registry)); // Output: true

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
  }

  returnSetOfArray(array: any[]) {
    let set = new Set(array);

    console.log(set);

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

}
