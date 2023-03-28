import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReaderService } from 'src/app/services/reader.service';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit, AfterViewInit {

  ipAddress: string = "";

  constructor(
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private readerService: ReaderService
  ) { }

  ngOnInit(): void {
    this.ipAddress = this.route?.snapshot?.queryParamMap.get('ipAddress') || '';

    this.readerService.apiCallToGetSingleViewAsn(this.ipAddress).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error('Error in sending single view asn response ', err);
      },
      complete: () => {
        console.info('Single view ASN request completed');
      }
    });
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   const scoreSpan = this.elementRef.nativeElement.querySelector('.threat-score-div span');
    //   scoreSpan.insertAdjacentHTML('afterend', '<div>New element appended after score</div>');

    // }, 1500);
  }
}
