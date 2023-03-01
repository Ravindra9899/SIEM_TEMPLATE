import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }


}

@Component({
  selector: 'app-dialog',
  template: '<div [innerHTML]="safeContent"></div>'
})
export class DialogComponent {

  public safeContent: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ){
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(data.context);
  }
}
