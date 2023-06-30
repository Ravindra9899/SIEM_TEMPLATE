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

  constructor(private route: ActivatedRoute, private service: DatasetTagPatternService) {}
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
          // this.tagsList = response['data'];
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

    this.tagsList = ["djsdljs", "dhssjg", "jsdcbsdhc", "djhdsbcbd"];
  }

}
