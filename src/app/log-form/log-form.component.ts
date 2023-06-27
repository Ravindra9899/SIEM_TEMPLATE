import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  private datasetOptions: string[] = ["A", "B", "C"];

  selectedDataset: string = '';
  pattern: string = '';

  constructor(
    private logservice: LogService
  ) { }

  ngOnInit(): void {
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
