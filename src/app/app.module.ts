import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplatePartsModule } from './template-parts/template-parts.module';
import { LogFormComponent } from './log-form/log-form.component';
import { FormsModule } from '@angular/forms';
import { LogTableComponent } from './log-table/log-table.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { DatasetTagPatternComponent } from './dataset-tag-pattern/dataset-tag-pattern.component';
import { DatasetTagPatternViewComponent } from './dataset-tag-pattern-view/dataset-tag-pattern-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LogFormComponent,
    LogTableComponent,
    DatasetTagPatternComponent,
    DatasetTagPatternViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplatePartsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
