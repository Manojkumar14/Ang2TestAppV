import { Component, OnInit } from '@angular/core';

import { MockService } from '../services/mock.service';

@Component({
  selector: 'app-location-maintenance',
  templateUrl: './location-maintenance.component.html',
  styleUrls: ['./location-maintenance.component.css']
})
export class LocationMaintenanceComponent implements OnInit {

  LocationData: any[];
  dataArrayCopy: any[];
  fieldsArray: any = [];
  dataArray: any = [];
  errorMsg = '';
  displayGrid = false;
  search: any = {
    'fieldValue': 'Location',
    'textValue': ''
  };

  constructor(private mockService: MockService) { }

  ngOnInit() {
    this.displayGrid = false;
    this.getLocationData();
  }
  getLocationData() {
    this.LocationData = this.mockService.getLocation();
    this.dataArray = this.LocationData;
    this.fieldsArray = Object.keys(this.LocationData[0]);
  }
  onSubmit(mySearch) {
    console.log(mySearch);
    this.dataArrayCopy = [];
    this.errorMsg = '';
    const filArray = [];
    if (mySearch.textValue === '' || mySearch.textValue !== '' ) {
      for (const data of this.dataArray) {
        const re = new RegExp(mySearch.textValue, 'gi');
        // not working for numbers...
        if (data[mySearch.fieldValue].match(re)) {
          filArray.push(data);
        }
      }
      this.dataArrayCopy = filArray;
    }
    this.displayGrid = true;
  }
}
