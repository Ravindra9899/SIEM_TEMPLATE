import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from "@angular/material/chips";

import { ScannerComponent } from './ui/scanner/scanner.component';
import { ConfigurationComponent } from './ui/configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplatePartsModule } from './template-parts/template-parts.module';
import { ScanReportComponent } from './ui/scan-report/scan-report.component';
import { ChartsComponent } from './ui/charts/charts.component';
import { PrevScansComponent } from './ui/prev-scans/prev-scans.component';
import { AbuseIPDBRecordTableComponent } from './ui/prev-scans/abuse-ipdbrecord-table/abuse-ipdbrecord-table.component';
import { AlienvaultRecordTableComponent } from './ui/prev-scans/alienvault-record-table/alienvault-record-table.component';
import { BotvijComponent } from './ui/prev-scans/botvij/botvij.component';
import { BinaryDefenceComponent } from './ui/prev-scans/binary-defence/binary-defence.component';
import { BruteforceBlockerComponent } from './ui/prev-scans/bruteforce-blocker/bruteforce-blocker.component';
import { CinsComponent } from './ui/prev-scans/cins/cins.component';
import { CirclComponent } from './ui/prev-scans/circl/circl.component';
import { HoneydbComponent } from './ui/prev-scans/honeydb/honeydb.component';
import { MaltiverseComponent } from './ui/prev-scans/maltiverse/maltiverse.component';
import { VirustotalComponent } from './ui/prev-scans/virustotal/virustotal.component';
import { WhoisComponent } from './ui/prev-scans/whois/whois.component';
import { ScannedIpListComponent } from './views/scanned-ip-list/scanned-ip-list.component';
import { ScannedUrlsListComponent } from './views/scanned-urls-list/scanned-urls-list.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConfigurationComponent,
    ScannerComponent,
    ScanReportComponent,
    ChartsComponent,
    PrevScansComponent,
    AbuseIPDBRecordTableComponent,
    AlienvaultRecordTableComponent,
    BotvijComponent,
    BinaryDefenceComponent,
    BruteforceBlockerComponent,
    CinsComponent,
    CirclComponent,
    HoneydbComponent,
    MaltiverseComponent,
    VirustotalComponent,
    WhoisComponent,
    ScannedIpListComponent,
    ScannedUrlsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplatePartsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatChipsModule,
    DataTablesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
