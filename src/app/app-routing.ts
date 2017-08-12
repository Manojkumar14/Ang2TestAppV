import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GlobalSearchComponent } from 'app/global-search/global-search.component';
import {LocationMaintenanceComponent} from 'app/location-maintenance/location-maintenance.component';

const routes: Routes = [
  {path: 'globalSearch', component: GlobalSearchComponent},
  {path: 'locationMaintenance', component: LocationMaintenanceComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouting {}
