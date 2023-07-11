import { Component, OnInit } from '@angular/core';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  private datasetOptions: string[] = [];

  placeholderList!: { placeholder: string, description: string }[];

  placeholderRecords: any;

  postPatternFormMess: string = "";

  datasetRecords: any;
  regexRulesRecords: any;

  selectedDataset: string = '';
  pattern: string = '';

  constructor(
    private service: LogService
  ) {

  }

  /**
   * The function iterates through the dataset records and adds the name of each record to the dataset
   * options array.
   */
  processDatasetRecordsForDisplay(){
    for(let i = 0;i < this.datasetRecords.length; i++){
      this.datasetOptions.push(this.datasetRecords[i]['name'])
    }
  }

  /**
   * The `ngOnInit` function subscribes to the `getAllDataset` and `getAllPlaceholders` methods of the
   * `LogService` and handles the response using the `next`, `error`, and `complete` callbacks.
   */
  ngOnInit(): void {
    /* The code snippet is subscribing to the `getAllDataset()` method of the `LogService` and handling
    the response using the `next`, `error`, and `complete` callbacks. */
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

    /* The code snippet is subscribing to the `getAllPlaceholders()` method of the `LogService` and
    handling the response using the `next`, `error`, and `complete` callbacks. */
    this.service.getAllPlaceholders().subscribe({
      next: (response) => {
        console.info('getAllPlaceholders service subscribed');
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
          this.placeholderRecords = response['data'];
          this.processPlaceholderRecordsForDisplay(this.placeholderRecords);
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

  /**
   * The function "processPlaceholderRecordsForDisplay" takes an array of placeholder records, extracts
   * the "placeholder" and "description" properties from each record, and assigns them to a new array
   * called "placeholderList".
   * @param {any} placeholderRecords - The parameter `placeholderRecords` is an array of objects. Each
   * object in the array represents a placeholder record and has two properties: `placeholder` and
   * `description`.
   */
  processPlaceholderRecordsForDisplay(placeholderRecords: any){
    let tmpList = [];
    for(let i = 0;i < this.placeholderRecords.length;++i){
      tmpList.push({
        "placeholder": this.placeholderRecords[i]['placeholder'],
        "description": this.placeholderRecords[i]['description']
      });
    }

    this.placeholderList = tmpList;
  }

  getDatasetOptions() {
    return this.datasetOptions;
  }

  /**
   * The `onAdd` function logs the selected dataset and pattern, checks if they are not empty, and then
   * makes a POST request to the `postPatternForDataset` method of the `LogService` with the pattern
   * and selected dataset as parameters, handling the response using the `next`, `error`, and
   * `complete` callbacks.
   */
  onAdd() {
    console.clear();
    console.log('onAdd Clicked =>', this.selectedDataset, " ; ", this.pattern);
    if (
      this.selectedDataset.trim() != ""
      && this.pattern.trim() != ""
    ) {
      let patternFormData = {
        "pattern": this.pattern,
        "selectedDataset": this.selectedDataset
      };

      /* The code snippet is subscribing to the `postPatternForDataset` method of the `LogService` and
      handling the response using the `next`, `error`, and `complete` callbacks. */
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
            this.postPatternFormMess = response['data']['report'];
          } else {
            console.error("message", response['message']);
            console.error('response was undefined');
            this.postPatternFormMess = response['data']['report'];
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
