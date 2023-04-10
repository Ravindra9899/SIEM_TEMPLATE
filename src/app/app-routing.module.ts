import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsComponent } from './ui/charts/charts.component';
import { ConfigurationComponent } from './ui/configuration/configuration.component';
import { PrevScansComponent } from './ui/prev-scans/prev-scans.component';
import { ScanReportComponent } from './ui/scan-report/scan-report.component';
import { ScannerComponent } from './ui/scanner/scanner.component';
import { SingleViewComponent } from './views/scanned-ip-list/single-view/single-view.component';
import { LoginComponent } from './views/user/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminRoleGuard } from './guards/admin-role.guard';

const routes: Routes = [
  {
    path: "dashboard", component: DashboardComponent,
    canActivate: [AuthGuard, AdminRoleGuard]
  },
  {
    path: "config", component: ConfigurationComponent,
    canActivate: [AuthGuard, AdminRoleGuard]
  },
  {
    path: "scan", component: ScannerComponent,
    canActivate: [AuthGuard, AdminRoleGuard]
  },
  {
    path: "view-report", component: ScanReportComponent,
    canActivate: [AuthGuard, AdminRoleGuard]
  },
  {
    path: "charts", component: ChartsComponent,
    canActivate: [AuthGuard, AdminRoleGuard]
  },
  {
    path: "read", component: PrevScansComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'single-view', component: SingleViewComponent,
    canActivate: [AuthGuard, AdminRoleGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: true, relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
