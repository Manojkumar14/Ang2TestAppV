import { Component, OnInit } from '@angular/core';

import { MockService } from '../services/mock.service';
import { GlobalSearchService } from '../services/global-search.service';
import { PaginationService } from '../services/pagination/pagination.service';

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
  tableTitle: any = '';
  displayGrid = false;
  displayLabel = false;
  search: any = {
    'tableValue': '',
    'fieldValue': '',
    'textValue': ''
  };
  // pagination variables...start
  data: any = [];
  offsetIndex: any = 0;
  recordsPerPageIndex: any = 0;
  totalRecords: any = 0;
  totalPages: any = 0;
  // pagination variables...end

  constructor(private mockService: MockService, private globalSearchService: GlobalSearchService) { }

  ngOnInit() {
    this.displayGrid = false;
    this.displayLabel = false;
    this.globalMenu = this.mockService.getGlobalMenu();
  }

  onSearchTable(myTable) {
    this.search.textValue = '';
    this.search.fieldValue = '';
    this.fieldsArray = [];
    let errMessage: any = [];

    for (let i = 0; i < this.globalMenu.length; i++) {
      if (this.globalMenu[i].value === myTable) {
        this.tableTitle = this.globalMenu[i].text;
      }
    }

    if (myTable != null) {
      this.globalSearchService.getGlobalSearchOptions(myTable)
        .subscribe(
        (globalList) => {
          this.fieldsArray = globalList.fields;
        },
        errorMsg => errMessage = <any>errorMsg
        );
    }
    this.displayGrid = false;
  }

  onSearchField(myField) {
    this.search.textValue = '';
  }

  onSubmit(offset?, searchData?) {
    this.data = [];
    this.dataArray = [];
    let errMessage: any = [];
    searchData = this.search;
    if (offset === undefined) {
      offset = 0;
    }
    if (searchData.tableValue !== '') {
      this.globalSearchService.getGlobalSearchData(offset, searchData.tableValue, searchData.fieldValue, searchData.textValue)
        .subscribe(
        (globalDataList) => {
          this.data.push(globalDataList[0]);
          this.dataArray = this.data[0];
          this.offsetIndex = globalDataList[1];
          this.recordsPerPageIndex = globalDataList[2];
          this.totalRecords = globalDataList[3];
          this.totalPages = globalDataList[4];
          if (this.dataArray.length !== 0) {
            this.displayGrid = true;
            this.displayLabel = false;
          } else {
            this.displayGrid = false;
            this.displayLabel = true;
          }
        },
        errorMsg => errMessage = <any>errorMsg
        );
    } else {
      alert('Please select value from Table/Form dropdown..!');
    }
  }

  dummyFunc(offset?, searchData?) {
    this.dataArray = [];
    let errMessage: any = [];
    if (searchData.tableValue !== '') {
      this.globalSearchService.getGlobalSearchData(offset, searchData.tableValue, searchData.fieldValue, searchData.textValue)
        .subscribe(
        (globalDataList) => {
          this.dataArray = globalDataList;
          if (this.dataArray.length !== 0) {
            this.displayGrid = true;
            this.displayLabel = false;
          } else {
            this.displayGrid = false;
            this.displayLabel = true;
          }
        },
        errorMsg => errMessage = <any>errorMsg
        );
    } else {
      alert('Please select value from Table/Form dropdown..!');
    }

  }

}
