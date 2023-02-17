import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';
// import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    loggedInUser: any;
    loggedInUserRoles: string[] = [];
    isSuperadmin: boolean = false;
    isAdmin: boolean = false;
    isAuditor: boolean = false;

    constructor(
        //public authService: AuthService,
        //private _commonServiceRef: CommonService
    ) { }

    ngOnInit() {
        // get current user details
    //    // this.loggedInUser = this.authService.currentUser;
    //     let userRolesIdArray = this.loggedInUser.roles;

    //     let decryptedRoleids = userRolesIdArray.map((roleid: string) => this._commonServiceRef.decryptData(roleid))
    //     this.isSuperadmin = decryptedRoleids.some((elem: any) => elem === 'superadmin');
    //     this.isAdmin = decryptedRoleids.some((elem: any) => elem === 'admin');
    //     this.isAuditor = decryptedRoleids.some((elem: any) => elem === 'auditor');
    //     // get user roles
    //     /* this._commonServiceRef.getRolesByID(decryptedRoleids).subscribe({
    //         next: (rolesResponse: any) => {
    //             if (rolesResponse.length) {
    //                 this.isSuperadmin = rolesResponse.some((elem: any) => elem.role === 'superadmin');
    //                 this.isAdmin = rolesResponse.some((elem: any) => elem.role === 'admin');
    //                 this.isAuditor = rolesResponse.some((elem: any) => elem.role === 'auditor');
    //             }
    //         },
    //         error: (err) => {
    //             console.error(err);
    //         }
    //     }); */
    // }

}
logoutUser() {
 //   this.authService.logout();
}
}
