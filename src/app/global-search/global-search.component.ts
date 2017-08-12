import { Component, OnInit } from '@angular/core';

import { MockService } from '../services/mock.service';
import { GlobalSearchService } from '../services/global-search.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent implements OnInit {
  globalMenu: any = [];
  tempArray: any = [];
  fieldsArray: any = [];
  dataArray: any = [];
  displayGrid = false;
  search: any = {
    'tableValue': '',
    'fieldValue': '',
    'textValue': ''
  };

  constructor(private mockService: MockService, private globalSearchService: GlobalSearchService) { }

  ngOnInit() {
    this.displayGrid = false;
    this.globalMenu = this.mockService.getGlobalMenu();
  }

  onSearchTable(myTable) {
    this.search.textValue = '';
    this.fieldsArray = [];
    let errMessage: any = [];
    if (myTable != null) {
      this.globalSearchService.getGlobalSearchData(myTable)
          .subscribe(
            (globalList) => {
              this.fieldsArray = Object.keys(globalList[0]);
            },
            errorMsg => errMessage = <any>errorMsg
          );
    }
    this.displayGrid = false;
  }

  onSearchField(myField) {
    this.search.textValue = '';
  }

  onSubmit(searchData) {
    this.dataArray = [];
    let errMessage: any = [];
    if (searchData.tableValue !== '') {
      this.globalSearchService.getGlobalSearchData(searchData.tableValue, searchData.fieldValue, searchData.textValue)
        .subscribe(
            (globalDataList) => {
              this.dataArray = globalDataList;
            },
            errorMsg => errMessage = <any>errorMsg
          );
          this.displayGrid = true;
    }else {
      alert('Please select value from Table/Form dropdown..!');
    }
  }
}
