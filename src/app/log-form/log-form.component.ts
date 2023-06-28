import { Component, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  private datasetOptions: string[] = ["A", "B", "C"];

  placeholderList!: { placeholder: string, regex: string, description: string }[];

  selectedDataset: string = '';
  pattern: string = '';

  constructor(
    private logservice: LogService
  ) {

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
    ]
  }

  getDatasetOptions() {
    return this.datasetOptions;
  }

  onAdd() {
    console.clear();
    console.log('onAdd Clicked');
    if (
      this.selectedDataset.trim() != ""
      && this.pattern.trim() != ""
    ) {
      console.log(this.selectedDataset);
      console.log(this.pattern);

      this.pattern = this.logservice.placeholders(this.pattern);
      console.log(this.pattern);

      localStorage.setItem(this.selectedDataset, this.pattern);
      console.log(Object.keys(localStorage));
    } else {
      console.error('fields required');
    }
  }

}
