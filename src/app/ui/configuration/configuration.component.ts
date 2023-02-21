import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
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

  virusTotalNewAPIKey= '';

  constructor(
    private scanService: ScannerServiceService,
    private dialog: MatDialog,
    private configInnerHtmlGen: ConfigInnerhtmlGeneratorService
  ) { }

  ngOnInit(): void {
    this.setAvailableApis();
  }

  openDialog(innerHTML: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        content: innerHTML
      }
    })
  }

  getAvailableApis() {
    return this.availableApis;
  }

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

  onApiView(idOfApi: number) {
    this.showEditor=false;
    let innerHTML = "";
    console.log("View API of Index ", idOfApi);

    if (idOfApi < this.availableApis.length) {
      if (idOfApi == 0) {
        innerHTML = this.configInnerHtmlGen.virusTotalViewHtmlGenerator(this.availableApis[idOfApi]);
      }
    }

    if(innerHTML){
      this.openDialog(innerHTML);
    }
  }

  // onApiDelete(idOfApi: number) {
  //   console.log("Delete API at Index ", idOfApi);
  // }

  onApiEdit(idOfApi: number) {
    console.log("Edit API at Index ", idOfApi);

    if(idOfApi < this.availableApis.length){
      this.showEditor = true;

      this.currentIdOfApi = idOfApi;
    }
  }

  updateVirusTotalApiKey(){
    if(confirm("Update API Key (This process is irreversible)?")){
      console.log("API Key updated");
      console.log(this.virusTotalNewAPIKey);
    }else{
      console.log("edit cancelled");
    }
  }

  onApiDisable(idOfApi: number) {
    console.log("Disable API at Index ", idOfApi);

    if(confirm("Disable this scanner?")){
      console.log("Disabled scanner ", this.availableApis[idOfApi]);
    }else{
      console.log("disable cancelled");
    }
  }
}


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