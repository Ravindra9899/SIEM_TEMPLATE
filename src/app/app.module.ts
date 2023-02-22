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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScannerComponent } from './ui/scanner/scanner.component';
import { ConfigurationComponent } from './ui/configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplatePartsModule } from './template-parts/template-parts.module';
import { ScanReportComponent } from './ui/scan-report/scan-report.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConfigurationComponent,
    ScannerComponent,
    ScanReportComponent,
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
