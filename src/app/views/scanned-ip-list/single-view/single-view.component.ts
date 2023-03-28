import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit, AfterViewInit {

  ipAddress: string = "";

  constructor(
    private route: ActivatedRoute,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.ipAddress = this.route?.snapshot?.queryParamMap.get('ipAddress') || '';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const scoreSpan = this.elementRef.nativeElement.querySelector('.threat-score-div span');
      scoreSpan.insertAdjacentHTML('afterend', '<div>New element appended after score</div>');

    }, 1500);
  }

}
