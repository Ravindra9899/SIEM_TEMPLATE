import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogFormComponent } from './log-form/log-form.component';
import { LogTableComponent } from './log-table/log-table.component';
import { DatasetTagPatternComponent } from './dataset-tag-pattern/dataset-tag-pattern.component';
import { DatasetTagPatternViewComponent } from './dataset-tag-pattern-view/dataset-tag-pattern-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: "dashboard", component: DashboardComponent },
  { path: 'form', component: LogFormComponent },
  { path: 'dataset-tag-pattern', component: DatasetTagPatternComponent },
  { path: 'dataset-tag-pattern-view', component: DatasetTagPatternViewComponent },
  { path: 'table', component: LogTableComponent }
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
