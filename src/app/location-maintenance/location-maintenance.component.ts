import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupName, FormControl, FormControlName, Validators, NgForm } from '@angular/forms';

import { MockService } from '../services/mock.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location-maintenance',
  templateUrl: './location-maintenance.component.html',
  styleUrls: ['./location-maintenance.component.css']
})
export class LocationMaintenanceComponent implements OnInit {
  locationForm: FormGroup;
  LocationData: any[];
  dataArrayCopy: any[];
  fieldsArray: any = [];
  dataArray: any = [];
  location: any = {};
  showPanel: any = false;
  hidePanel: any = true;
  varReadOnly: any = false;
  displaySaveBtn: any = true;
  displayUpdateBtn: any = false;
  locationTitle: any = 'Add/Change location';
  errorMsg = '';
  displayGrid = false;
  search: any = {
    'fieldValue': 'location',
    'textValue': ''
  };
  data: any = [];
  offsetIndex: any = 0;
  recordsPerPageIndex: any = 0;
  totalRecords: any = 0;
  totalPages: any = 0;

  constructor(private mockService: MockService, private locationService: LocationService) { }

  ngOnInit() {
    this.getLocationFields();
    this.displayGrid = true;
    this.getCurrentPageData(0);
    this.varReadOnly = false;
    this.getLocationData(0);
  }
  getLocationFields() {
    let errMessage: any = [];
    this.locationService.getLocationOptions()
        .subscribe(
          (locationFields) => {
            this.fieldsArray = locationFields.fields;
          },
          errorMsg => errMessage = <any>errorMsg
        );
  }
  getLocationData(offset?, locationSearch?) {
    this.data = [];
    this.dataArray = [];
    this.dataArrayCopy = [];
    if (this.search.textValue) {
      locationSearch = this.search;
      offset = 0;
    }
    let errMessage: any = [];
    this.locationService.getLocationData(offset, locationSearch)
                        .subscribe(
                          (locationData) => {
                            this.data.push(locationData[0]);
                            this.dataArray = this.data[0];
                            this.dataArrayCopy = this.data[0];
                            this.offsetIndex = locationData[1];
                            this.recordsPerPageIndex = locationData[2];
                            this.totalRecords = locationData[3];
                            this.totalPages = locationData[4];
                            console.log(this.dataArrayCopy);
                          },
                          errorMsg => errMessage = <any>errorMsg
                        );
  }
  getCurrentPageData(offset) {
    let errMessage: any = [];
    this.data = [];
    this.dataArrayCopy = [];
    this.locationService.getCurrentPageRecords(offset)
                        .subscribe(
                          (contentRange) => {
                            this.data.push(contentRange[0]);
                            this.dataArrayCopy = this.data[0];
                            this.offsetIndex = contentRange[1];
                            this.recordsPerPageIndex = contentRange[2];
                            this.totalRecords = contentRange[3];
                            this.totalPages = contentRange[4];
                          },
                          errorMsg => errMessage = <any>errorMsg
                        );
  }
  addNewLocation() {
    this.location = {};
    this.showPanel = true;
    this.hidePanel = false;
    this.displaySaveBtn = true;
    this.displayUpdateBtn = false;
    this.locationTitle = 'Add New Location';
  }
  onCancel() {
    this.showPanel = false;
    this.hidePanel = true;
  }
  onChange(editData) {
    this.location = {};
    this.showPanel = true;
    this.hidePanel = false;
    this.displaySaveBtn = false;
    this.displayUpdateBtn = true;
    this.locationTitle = 'Change Location';
    this.location = editData;
    this.varReadOnly = true;
  }
  saveLocation(formdata) {
    if (!formdata.active) { formdata.active = false; }
    if (!formdata.secure) { formdata.secure = false; }
    if (!formdata.oversized) { formdata.oversized = false; }
    if (!formdata.pickNPack) { formdata.pickNPack = false; }
    let errMessage: any = [];
    this.locationService.addLocationData(formdata)
                        .subscribe(
                          (savedLocationDetails) => {
                            this.showPanel = false;
                            this.hidePanel = true;
                          },
                          errorMsg => errMessage = <any>errorMsg
                        );
  }
  updateLocation(formdata) {
    let errMessage: any = [];
    this.locationService.updateLocationData(formdata)
                        .subscribe(
                          (updatedLocationDetails) => {
                            this.showPanel = false;
                            this.hidePanel = true;
                          },
                          errorMsg => errMessage = <any>errorMsg
                        );
  }



}
