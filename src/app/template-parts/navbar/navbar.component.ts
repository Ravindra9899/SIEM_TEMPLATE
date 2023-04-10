import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';
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
    isBaseUser: boolean = false;
    isAuditor: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
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

        if (this.authService.isTokenValid() && this.authService.isAuthenticated()) {
            let role = this.authService.getUserRole();

            switch (role) {
                case 'admin':
                    this.isSuperadmin = true;
                    this.isBaseUser = false;
                    this.isAuditor = false;
                    break;

                case 'user':
                    this.isSuperadmin = false;
                    this.isBaseUser = true;
                    this.isAuditor = false;
                    break;

                case 'guest':
                    this.isSuperadmin = false;
                    this.isBaseUser = false;
                    this.isAuditor = false;
                    break;

                default:
                    this.isSuperadmin = false;
                    this.isBaseUser = false;
                    this.isAuditor = false;
                    break;
            }

        } else {
            this.isSuperadmin = false;
            this.isBaseUser = false;
            this.isAuditor = false;
        }

    }

    showLogOut(): boolean {

        if (this.isSuperadmin || this.isBaseUser || this.isAuditor) {
            return true;
        } else {
            return false;
        }
    }


    logoutUser() {
        //   this.authService.logout();

        localStorage.removeItem('jwt');

        const navigationExtras: NavigationExtras = {
            skipLocationChange: true
        };

        this.router.navigate(['/login'], navigationExtras);
    }
}
