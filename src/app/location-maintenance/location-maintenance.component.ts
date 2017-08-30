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

  constructor(private mockService: MockService, private locationService: LocationService) { }

  ngOnInit() {
    this.getLocationFields();
    this.displayGrid = true;
    this.getContentData();
    this.varReadOnly = false;
    this.getLocationData();
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
  getLocationData(locationSearch?: string) {
    let errMessage: any = [];
    this.locationService.getLocationData(locationSearch)
        .subscribe(
          (locationData) => {
            this.dataArray = locationData;
            this.dataArrayCopy = locationData;
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
    console.log(this.location);
  }
  saveLocation(formdata) {
    if (!formdata.active) { formdata.active = false; }
    if (!formdata.secure) { formdata.secure = false; }
    if (!formdata.oversized) { formdata.oversized = false; }
    if (!formdata.pickNPack) { formdata.pickNPack = false; }
    console.log(formdata);
    let errMessage: any = [];
    this.locationService.addLocationData(formdata)
                        .subscribe(
                          (savedLocationDetails) => {
                            console.log(savedLocationDetails);
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
                            console.log(updatedLocationDetails);
                            this.showPanel = false;
                            this.hidePanel = true;
                          },
                          errorMsg => errMessage = <any>errorMsg
                        );
  }
  getContentData() {
    let errMessage: any = [];
    this.locationService.getContentRange()
                        .subscribe(
                          (contentRange) => {
                            console.log(contentRange);
                          },
                          errorMsg => errMessage = <any>errorMsg
                        );
  }
}
