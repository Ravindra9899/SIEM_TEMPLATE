import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './ui/configuration/configuration.component';
import { ScanReportComponent } from './ui/scan-report/scan-report.component';
import { ScannerComponent } from './ui/scanner/scanner.component';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "config", component: ConfigurationComponent },
  { path: "scan", component: ScannerComponent },
  { path: "view-report",component: ScanReportComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

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
