import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  private datasetOptions: string[] = ["A", "B", "C"];

  selectedDataset: string = '';
  pattern: string = '';

  constructor() { }

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

      localStorage.setItem(this.selectedDataset, this.pattern);
      console.log(Object.keys(localStorage));
    } else {
      console.error('fields required');
    }
  }

}
