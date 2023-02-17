// import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
    loggedInUser: any;
    fullWidthLayout: boolean;

    isSuperadmin: boolean = false;
    isAdmin: boolean = false;
    isAuditor: boolean = false;

    constructor(
        private _routerRef: Router,
        // public authService: AuthService,
        // private _commonServiceRef: CommonService
    ) {
        this.fullWidthLayout = false;
        
    }

    ngOnInit() {
        // // get current user details
        // this.loggedInUser = this.authService.currentUser;
        // let decryptedRoleids = this.loggedInUser.roles.map((roleid: string) => this._commonServiceRef.decryptData(roleid))
        // this.isSuperadmin = decryptedRoleids.some((elem: any) => elem === 'superadmin');
        // this.isAdmin = decryptedRoleids.some((elem: any) => elem === 'admin');
        // this.isAuditor = decryptedRoleids.some((elem: any) => elem === 'auditor');

        // let fullWidthPageUrls = environment.FULL_WIDTH_PAGE_URLS;
        // if (fullWidthPageUrls.includes(this._routerRef.url)) {
        //     this.fullWidthLayout = true;
        // }
    }

    logoutUser() {
//        this.authService.logout();
    }

}
