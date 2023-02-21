import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from "@angular/forms";

import { ConfigInnerhtmlGeneratorService } from 'src/app/services/config-innerhtml-generator.service';
import { ScannerServiceService } from 'src/app/services/scanner-service.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  private availableApis: Record<string, any>[] = [];
  public configData = '';
  showEditor: boolean = false;
  currentIdOfApi: number = 0;

  virusTotalNewAPIKey = '';
  forms: FormGroup[] | undefined;

  constructor(
    private scanService: ScannerServiceService,
    private dialog: MatDialog,
    private configInnerHtmlGen: ConfigInnerhtmlGeneratorService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.setAvailableApis();
    this.createFormGroups();
  }

  createFormGroups() {
    this.forms = [
      this.formBuilder.group({
        newApiKey: ['']
      }),
      this.formBuilder.group({
        field11: [''],
        field12: [''],
      }),

    ];

  }

  /**
   * The function opens a dialog box with the content of the innerHTML variable
   * @param {string} innerHTML - string - this is the HTML that will be displayed in the dialog.
   */
  openDialog(innerHTML: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        content: innerHTML
      }
    })
  }

  /**
   * It returns the value of the availableApis property
   * @returns The availableApis array.
   */
  getAvailableApis() {
    return this.availableApis;
  }

  /**
   * If the idOfApi is less than the length of the availableApis array, then set the showEditor
   * variable to true and set the currentIdOfApi variable to the idOfApi
   * @param {number} idOfApi - number - The index of the API in the availableApis array.
   */
  setAvailableApis() {
    this.scanService.getAllScanners().subscribe({
      "next": (response) => {
        console.log("Response: ", response);
        if (response.hasOwnProperty("message") &&
          response.hasOwnProperty("infoText") &&
          response.hasOwnProperty("data") &&
          response["message"].toString() == "success" &&
          response["data"] != null) {
          this.availableApis = response["data"];
          console.log("Active scanners :", this.availableApis);
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
   * This function is called when the user clicks on the "View" button of a particular API
   * @param {number} idOfApi - The index of the API in the availableApis array.
   */
  onApiView(idOfApi: number) {
    this.showEditor = false;
    let innerHTML = "";
    console.log("View API of Index ", idOfApi);

    if (idOfApi < this.availableApis.length) {
      if (idOfApi == 0) {
        innerHTML = this.configInnerHtmlGen.virusTotalViewHtmlGenerator(this.availableApis[idOfApi]);
      }
    }

    if (innerHTML) {
      this.openDialog(innerHTML);
    }
  }

  // onApiDelete(idOfApi: number) {
  //   console.log("Delete API at Index ", idOfApi);
  // }

  /**
   * If the idOfApi is less than the length of the availableApis array, then set the showEditor
   * variable to true and set the currentIdOfApi variable to the idOfApi
   * @param {number} idOfApi - number - The index of the API in the availableApis array.
   */
  onApiEdit(idOfApi: number) {
    console.log("Edit API at Index ", idOfApi);

    if (idOfApi < this.availableApis.length) {
      this.showEditor = true;
      this.currentIdOfApi = idOfApi;
    }
  }

  /**
   * This function is called when the user clicks on the "Disable" button of a scanner
   * @param {number} idOfApi - The index of the API in the availableApis array.
   */
  onApiDisable(idOfApi: number) {
    console.log("Update the status API at Index ", idOfApi);
    let textForNewStatus = this.availableApis[idOfApi]['status'] == "Active" ? "Disable" : "Activate";

    if (confirm(`${textForNewStatus} this scanner?`)) {

      let apiName = this.availableApis[idOfApi]['API_Name'];

      let newStatus = this.availableApis[idOfApi]['status'] == "Active" ? "Inactive" : "Active";

      this.scanService.updateStatusOfScanner(apiName, newStatus).subscribe({
        error: (error) => {
          console.error("Error in updating the scanner status");
          console.error(error);
        },
        next: (response) => {
          console.log(response.status);
          if (response.hasOwnProperty("message") &&
            response.hasOwnProperty("infoText") &&
            response.hasOwnProperty("data") &&
            response["message"].toString() == "success" &&
            response["data"] != null) {

            this.availableApis[idOfApi]['status'] = newStatus;

            let innerHTML = this.configInnerHtmlGen.scannerStatusUpdatedHTMLGen(apiName, newStatus);

            this.openDialog(innerHTML);
          }
        },
        complete: () => {
          console.log("update status request completed");
        }
      });
    } else {
      console.log("disable cancelled");
    }
  }


  onApiConfigUpdateClick(index: number) {
    if (index < this.availableApis.length) {
      if (confirm(`Update the configurations for Scanner ${this.availableApis[index]['API_Name']}?`)) {
        const formValues = this.forms![index].value;

        console.log("Entered value if form " + index + 1, " are:");
        console.log(formValues);

        switch (index) {
          case 0:
            if(formValues.hasOwnProperty('newApiKey') && formValues['newApiKey'] != null && formValues['newApiKey'] !="" && formValues!=false){
              let config = {
                "api_key": formValues['newApiKey']
              }
              this.scanService.updateConfigurationOfScanner(config, "Virus Total", this.availableApis[0]['status']).subscribe({
                error:(err)=>{
                  console.error("Error in updating config for VT " + err);
                },
                next: (response)=>{
                  console.log("Vt Update ", response.status);
                  if(response.hasOwnProperty("message") && response['message']=="success"){
                    console.log("Scan config updated");
                  }
                }
              });
            }else{
              this.openDialog(`<h5 style="color: white;">The entered API Key is not valid</h5>`)
            }
            break;
        
          default:
            break;
        }
      } else {
        console.log("update cancelled");
      }
    } else {
      this.openDialog('<h5 style:"color: white;">Sorry, but this API does not exist.</h5>');
    }
  }
}


/* It's a component that takes in a string of HTML and displays it */
@Component({
  selector: 'app-dialog',
  template: '<div [innerHTML]="safeContent"></div>',
})
export class DialogComponent {
  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  public safeContent: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(data.content);
  }
}