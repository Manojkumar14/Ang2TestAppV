import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouting } from './app-routing';

import { MockService } from './services/mock.service';
import { GlobalSearchService } from './services/global-search.service';
import { LocationService } from './services/location.service';
import { PromosCodesItemsService } from './services/promos-codes-items.service';

import { AppComponent } from './app.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { LocationMaintenanceComponent } from './location-maintenance/location-maintenance.component';
import { PaginationComponent } from './services/pagination/pagination.component';
import { CustomPipePipe } from './pipes/custom-pipe.pipe';
import { CustomDirectiveDirective } from './directives/custom-directive.directive';
import { PromosCodesItemMaintenanceComponent } from './promos-codes-item-maintenance/promos-codes-item-maintenance.component';
import { PromotionCodesComponent } from './promos-codes-item-maintenance/promotion-codes/promotion-codes.component';
import { PromotionItemsComponent } from './promos-codes-item-maintenance/promotion-items/promotion-items.component';

@NgModule({
  declarations: [
    AppComponent,
    GlobalSearchComponent,
    LocationMaintenanceComponent,
    PaginationComponent,
    CustomPipePipe,
    CustomDirectiveDirective,
    PromosCodesItemMaintenanceComponent,
    PromotionCodesComponent,
    PromotionItemsComponent,
  ],
  imports: [
    BrowserModule, AppRouting, FormsModule, HttpModule
  ],
  providers: [MockService, GlobalSearchService, LocationService, PromosCodesItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
