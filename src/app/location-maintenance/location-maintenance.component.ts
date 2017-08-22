import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

import { MockService } from '../services/mock.service';

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
  locationTitle: any = 'Add/Change location';
  errorMsg = '';
  displayGrid = false;
  search: any = {
    'fieldValue': 'location',
    'textValue': ''
  };


  constructor(private mockService: MockService) { }

  ngOnInit() {
    this.getLocationData();
    this.displayGrid = true;
  }
  getLocationData() {
    this.LocationData = this.mockService.getLocation();
    this.dataArray = this.LocationData;
    this.dataArrayCopy = this.LocationData;
    this.fieldsArray = Object.keys(this.LocationData[0]);
  }
  onSearch(mySearch) {
    this.dataArrayCopy = [];
    this.errorMsg = '';
    const fileArray = [];
    if (mySearch.textValue === '' || mySearch.textValue !== '' ) {
      for (const data of this.dataArray) {
        const re = new RegExp(mySearch.textValue, 'gi');
        // not working for numbers...
        if (data[mySearch.fieldValue].match(re)) {
          fileArray.push(data);
        }
      }
      this.dataArrayCopy = fileArray;
    }
    this.displayGrid = true;
  }
  addNewLocation() {
    this.location = {};
    this.showPanel = true;
    this.hidePanel = false;
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
    this.locationTitle = 'Change Location';
    this.location = editData;
    console.log(this.location);
  }
  addLocation(formdata) {
    console.log(formdata);
    this.showPanel = false;
    this.hidePanel = true;
  }
}
