import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReaderService } from 'src/app/services/reader.service';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {

  ipAddress: string = "";

  content: any = [];



  constructor(
    private readerService: ReaderService,
    private route: ActivatedRoute
  ) {
    console.clear();
  }

  ngOnInit(): void {
    this.ipAddress = this.route?.snapshot?.params['ipAddress'] || '';

    console.log("jjjuyg", this.ipAddress);

    this.readerService.apiCallToGetSingleView(this.ipAddress).subscribe({
      error: (err) => {
        console.log('error in receiving in single view doc');
        console.error(err);
      },
      next: (response) => {
        if (
          response?.message == 'success' &&
          response?.data != undefined &&
          response?.data != null &&
          response?.data?.content != null &&
          Array.isArray(response?.data?.content) &&
          response?.data?.content.length > 0
        ) {
          const content = response?.data?.content;
          console.log(content);

          this.content = content;
        } else {
          console.error(response?.status);
        }
      }
    });
  }

  doesExist(parameter: any): boolean {
    if (
      parameter &&
      parameter != null
    ) {
      return true;
    } else {
      return false;
    }
  }

  isArray(parameter: any): boolean {
    if (
      Array.isArray(parameter) &&
      parameter.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  isObject(parameter: any): boolean {
    if (typeof parameter == 'object' && !Array.isArray(parameter)) {
      return true;
    } else {
      return false;
    }
  }

  doesArrayElementExists(array: any, index: number): boolean {
    if (
      this.isArray(array) && array.length > index
    ) {
      return true;
    } else {
      return false;
    }
  }

  doesObjectPropertyExists(object: any, property: string) {
    if (
      this.isObject(object) &&
      object[`${property}`] != null &&
      object[`${property}`] != undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  async downloadPdf() {
    console.log('Calling download Service');

    this.readerService.apiCallToPrintScanReport(this.ipAddress).subscribe(
      {
        next: (response: Blob) => {
          // console.log(response.hasOwnProperty['headers'])
          console.log(response)
          // Handle the response here
          let fileName = 'Scan-Report-' + `${this.ipAddress}.pdf`;
          // Create a URL for the Blob object
          const url = URL.createObjectURL(response);

          // Create an anchor element and set its href attribute to the URL
          const a = document.createElement('a');
          a.href = url;
          // Set the anchor element's download attribute to the file name
          a.download = fileName;
          // Trigger a click event on the anchor element to download the file
          a.click();
          // Clean up the URL object
          URL.revokeObjectURL(url);

        },
        error: (error) => {
          // Handle the error here
          console.error('An error occurred:', error);
          // Display an error message to the user
          alert('Failed to retrieve PDF file: ' + error.message);
        }
      }
    );
  }

}
