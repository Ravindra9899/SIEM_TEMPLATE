import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
    fullWidthLayout: boolean;

    constructor(
        private _routerRef: Router
    ) {
        this.fullWidthLayout = false;
    }

    ngOnInit() {
        let fullWidthPageUrls = environment.FULL_WIDTH_PAGE_URLS;
        // if (fullWidthPageUrls.includes(this._routerRef.url)) {
        if (fullWidthPageUrls.some((url: any) => this._routerRef.url.match(url))) {
            this.fullWidthLayout = true;
        }
    }

}
