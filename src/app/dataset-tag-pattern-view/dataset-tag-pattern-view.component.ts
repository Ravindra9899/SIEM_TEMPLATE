import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatasetTagPatternService } from '../services/dataset-tag-pattern.service';

@Component({
  selector: 'app-dataset-tag-pattern-view',
  templateUrl: './dataset-tag-pattern-view.component.html',
  styleUrls: ['./dataset-tag-pattern-view.component.css']
})
export class DatasetTagPatternViewComponent implements OnInit {

  receivedDataset!: any;

  tagsList!: string[];

  /**
   * The function processes tag records and extracts the 'pattern' property to create a list of tags.
   * @param {any} tagRecords - The `tagRecords` parameter is an array of objects. Each object
   * represents a tag record and has a property called `pattern`.
   */
  processTagRecordsForDisplay(tagRecords: any) {
    let tags = [];
    for(let i = 0;i < tagRecords.length;++i){
      tags.push(tagRecords[i]['pattern']);
    }

    this.tagsList = tags;
  }

  constructor(private route: ActivatedRoute, private service: DatasetTagPatternService) {}

  /**
   * The ngOnInit function retrieves a dataset parameter from the route, calls a service to get tag
   * patterns based on the dataset name, and processes the tag records for display.
   */
  ngOnInit(): void {
    const t = this.route.queryParamMap
    .subscribe((params) => {
      this.receivedDataset = params.get('dataset');
    });

    this.service.getTagPatternsFromDatasetName(this.receivedDataset).subscribe({
      next: (response) => {
        console.info('getTagPatternsFromDatasetName service subscribed');
        if (
          response &&
          response != null &&
          response['message'] &&
          response['message'] != null &&
          response['message'].toString().toLowerCase() == 'success' &&
          response['data'] != null
        ) {
          // response['data'] = {status: success/failed}
          console.log("Got tags::::", response['data']);
          this.processTagRecordsForDisplay(response['data']);
        } else {
          console.error("message", response['message']);
          console.error('response was undefined');
        }
      },
      error: (err) => {
        console.error('getTagPatternsFromDatasetName service subscribe error');
        console.error(err);
      },
      complete: () => {
        console.info('getTagPatternsFromDatasetName service subscribe complete');
      }
    });
  }

}
