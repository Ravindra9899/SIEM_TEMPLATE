import { Component, OnInit } from '@angular/core';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  private datasetOptions: string[] = [];

  placeholderList!: { placeholder: string, regex: string, description: string }[];

  postPatternFormMess: string = "";

  datasetRecords: any;
  regexRulesRecords: any;

  selectedDataset: string = '';
  pattern: string = '';

  constructor(
    private service: LogService
  ) {

  }

  processDatasetRecordsForDisplay(){
    for(let i = 0;i < this.datasetRecords.length; i++){
      this.datasetOptions.push(this.datasetRecords[i]['name'])
    }
  }

  ngOnInit(): void {
    this.placeholderList = [
      {
        "placeholder": "%email%",
        "regex": "\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+",
        "description": "this will match to any valid email."
      },
      {
        "placeholder": "%ipAddress%",
        "regex": "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",
        "description": "this will match to any valid Ip address."
      },
      {
        "placeholder": "%numeric%",
        "regex": "\d+",
        "description": "this will match to the digits, not any alphabets or special letters."
      },
      {
        "placeholder": "%alphabet%",
        "regex": "[a-zA-Z]*",
        "description": "this will match to the alphabetic word(capital or small), not any digits or special letters."
      },
      {
        "placeholder": "%alnum%",
        "regex": "[a-zA-Z0-9]*",
        "description": ""
      }
    ];

    this.service.getAllDataset().subscribe({
      next: (response) => {
        console.info('getAllDataset service subscribed');
        if (
          response &&
          response != null &&
          response['message'] &&
          response['message'] != null &&
          response['message'].toString().toLowerCase() == 'success' &&
          response['data'] != null &&
          Array.isArray(response['data']) &&
          response['data'].length > 0
        ) {
          console.log(response['message']);
          console.log(response['data'][0]);
          this.datasetRecords = response.data;
          this.processDatasetRecordsForDisplay();
        } else {
          console.log(typeof response);
          console.error("message", response['message']);
          console.log(typeof response['data']);
          console.error('response was undefined');
        }
      },
      error: (err) => {
        console.error('getAllDataset service subscribe error');
        console.error(err);
      },
      complete: () => {
        console.info('getAllDataset service subscribe complete');
      }
    });
  }

  getDatasetOptions() {
    return this.datasetOptions;
  }

  onAdd() {
    console.clear();
    console.log('onAdd Clicked =>', this.selectedDataset, " ; ", this.pattern);
    if (
      this.selectedDataset.trim() != ""
      && this.pattern.trim() != ""
    ) {
      this.pattern = this.service.placeholders(this.pattern);

      let patternFormData = {
        "pattern": this.pattern,
        "selectedDataset": this.selectedDataset
      };

      console.log("sending req :::::::");
      this.service.postPatternForDataset(patternFormData).subscribe({
        next: (response) => {
          console.info('postPatternForDataset service subscribed');
          if (
            response &&
            response != null &&
            response['message'] &&
            response['message'] != null &&
            response['message'].toString().toLowerCase() == 'success' &&
            response['data'] != null
          ) {
            // response['data'] = {status: success/failed}
            console.log(response['message']);

            //alert message
            this.postPatternFormMess = "Successfully saved the record\n"+response['data']['report'];
          } else {
            console.error("message", response['message']);
            console.error('response was undefined');
            this.postPatternFormMess = "Error saving the record\n"+response['data'];
          }
        },
        error: (err) => {
          console.error('postPatternForDataset service subscribe error');
          console.error(err);
          this.postPatternFormMess = "Error saving the record\n"+err;
        },
        complete: () => {
          console.info('postPatternForDataset service subscribe complete');
        }
      });
    } else {
      console.error('fields required');
      this.postPatternFormMess = "Please fill correctly.";
    }
    // console.clear();
    console.log(this.postPatternFormMess);
  }

}
