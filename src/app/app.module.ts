import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouting } from './app-routing';

import { MockService } from './services/mock.service';
import { GlobalSearchService } from './services/global-search.service';
import { LocationService } from './services/location.service';

import { AppComponent } from './app.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { LocationMaintenanceComponent } from './location-maintenance/location-maintenance.component';
import { PaginationComponent } from './services/pagination/pagination.component';
import { CustomPipePipe } from './pipes/custom-pipe.pipe';
import { CustomDirectiveDirective } from './directives/custom-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    GlobalSearchComponent,
    LocationMaintenanceComponent,
    PaginationComponent,
    CustomPipePipe,
    CustomDirectiveDirective
  ],
  imports: [
    BrowserModule, AppRouting, FormsModule, HttpModule
  ],
  providers: [MockService, GlobalSearchService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
