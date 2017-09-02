import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements  OnInit {
  @Input() totalRecords;
  @Input() recordsPerPage;
  @Input() offset;

  @Output() getOffsetValue: EventEmitter<any> = new EventEmitter();

  currentPage: any = 0;
  lastIndex: any = -1;
  incIndex: any = 5;
  decIndex: any = -1;
  flag: any = 0;
  constructor() { }

  ngOnInit() {
  }
  getFirstDisabled() {
    if (this.currentPage === 0) {
      return 'disabled';
    }else {
      return 'false';
    }
  }
  getLastDisabled() {
    if (this.currentPage === Math.ceil(this.totalRecords / this.recordsPerPage) - 1) {
      return 'disabled';
    }else {
      return 'false';
    }
  }

  getNumberArray(num) {
    const numberArray = [];
    for (let i = 1; i <= num; i++) {
      numberArray.push(i);
    }
    return numberArray; // this function returns number Array..!
  }
  getNumberOfPages() {
    const pages = Math.ceil(this.totalRecords / this.recordsPerPage);
    return pages; // this function returns number..!
  }
  setCurrentPage(ind, btnIndex) {
    this.currentPage = ind;
    if (this.currentPage !== 0 && this.currentPage + 1 !== Math.ceil(this.totalRecords / this.recordsPerPage)) {
      if (this.currentPage > this.incIndex && this.incIndex < Math.ceil(this.totalRecords / this.recordsPerPage)) {
        if (btnIndex !== this.currentPage) {
          this.incIndex++;
          this.decIndex++;
        }
      }else {
        if (this.currentPage < this.incIndex && this.incIndex > 5) {
          if (btnIndex !== this.currentPage) {
            this.incIndex--;
            this.decIndex--;
          }
        }
      }
    }
    const offSetValue = this.currentPage * 50;
    this.getOffsetValue.emit(JSON.stringify(offSetValue));
  }
  showBtn(ind) {
    if (ind < this.incIndex && ind > this.decIndex) {
      return false;
    }
    return true;
  }
  setColor(ind) {
    if (ind === this.currentPage) {
      return { backgroundColor: '#337ab7', color: '#fff' };
    }
  }
  getFirstPageData() {// this function returns first Page details..!
    this.currentPage = 0;
    this.lastIndex = -1;
    this.incIndex = 5;
    this.decIndex = -1;
    const offSetValue = this.offset * 0;
    this.getOffsetValue.emit(JSON.stringify(offSetValue));
  }
  getPreviousPageData(ind) {// this function returns previous Page details..!
    if (this.currentPage !== 0) {
      this.currentPage = this.currentPage - 1;
    }
    if (this.incIndex > 5) {
      this.incIndex = this.incIndex - 1;
      this.decIndex = this.decIndex - 1;
      const offSetValue = this.currentPage * 50 ;
      this.getOffsetValue.emit(JSON.stringify(offSetValue));
    }
  }
  getNextPageData(ind) {// this function returns next Page details..!
    this.flag = 0;
    if (this.incIndex < Math.ceil(this.totalRecords / this.recordsPerPage) ) {
      this.currentPage = this.currentPage + 1;
      this.flag++;
      this.incIndex++;
      this.decIndex++;
    }
    if ((this.currentPage < Math.floor(this.totalRecords / this.recordsPerPage)) && (this.incIndex - 1 !== this.currentPage)) {
      if (this.flag === 0) {
          if (this.currentPage !== Math.ceil(this.totalRecords / this.recordsPerPage) - 1) {
              this.currentPage++;
          }
      } else {
          this.flag = 0;
      }
  }
    const offSetValue = this.currentPage * 50 ;
    this.getOffsetValue.emit(JSON.stringify(offSetValue));
  }
  getLastPageData(ind) { // this function returns last Page details..!
      this.currentPage = Math.ceil(this.totalRecords / this.recordsPerPage) - 1;
      this.incIndex = this.currentPage + 1;
      this.decIndex = this.currentPage - 5;
      this.lastIndex = this.currentPage + 1;
      const offSetValue = this.currentPage * 50 ;
      this.getOffsetValue.emit(JSON.stringify(offSetValue));
  }




}
