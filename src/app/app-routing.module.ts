import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IpNetworkGraphComponent } from './ui/ip-network-graph/ip-network-graph.component';
import { SearchFieldDataComponent } from './ui/search-field-data/search-field-data.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: "dashboard", component: DashboardComponent },
  { path: "ip-network-graph", component: IpNetworkGraphComponent },
  { path: "search-field-data", component: SearchFieldDataComponent }
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
