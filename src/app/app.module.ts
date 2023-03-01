import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplatePartsModule } from './template-parts/template-parts.module';
import { IpNetworkGraphComponent } from './ui/ip-network-graph/ip-network-graph.component';
import { AmChartsGraphComponent } from './ui/ip-network-graph/am-charts-graph/am-charts-graph.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationComponent } from './ui/configuration/configuration.component';
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IpNetworkGraphComponent,
    AmChartsGraphComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplatePartsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
