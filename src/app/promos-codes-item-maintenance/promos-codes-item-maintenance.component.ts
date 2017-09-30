import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupName, FormControl, FormControlName, Validators, NgForm } from '@angular/forms';
import { PromosCodesItemsService } from '../services/promos-codes-items.service';

@Component({
  selector: 'app-promos-codes-item-maintenance',
  templateUrl: './promos-codes-item-maintenance.component.html',
  styleUrls: ['./promos-codes-item-maintenance.component.css']
})
export class PromosCodesItemMaintenanceComponent implements OnInit {

  promotionForm: FormGroup;
  promotion: any = {};
  vpCustomersData: any[];
  promotionDataArray: any[];
  promotionFieldsArray: any[];
  showPanel: any = false;
  hidePanel: any = true;
  showCodePanel: any;
  showItempanel: any;
  varReadOnly: any = false;
  displaySaveBtn: any = true;
  displayUpdateBtn: any = false;
  promotionTitle: any = 'Add/Change promotion';
  vpc: any = 89985;
  promId: any = 0;
  errorMsg = '';
  displayGrid = false;
  displayLabel = false;
  displayCodeGrid = true;
  displayItemGrid = true;
  selectedRowPromId: any;
  selectedRowPromDesc: any;
  selectedPromotion: any = {};
  search: any = {
    'fieldValue': 'promId',
    'textValue': '',
    'radioValue': ''
  };
  offsetIndex: any = 0;
  recordsPerPageIndex: any = 0;
  totalRecords: any = 0;
  totalPages: any = 0;

  constructor(private promosCodesItemsService: PromosCodesItemsService) { }

  ngOnInit() {
    this.getPromotionFields();
    this.getPromotionDetails(0);
    this.getVpCustomersDetails();
    this.vpc = 89985;
    this.displayGrid = true;
    this.selectedRowPromId = 1;
    this.selectedRowPromDesc = 'Februcherry';
    this.selectedPromotion = this.promotionDataArray[0];
  }
  setClickedRow(index, data) {
    this.selectedRowPromId = data.promId;
    this.selectedRowPromDesc = data.promDesc;
    this.selectedPromotion = data;
  }
  setCodeGridsShoworHide(Codestatus) {
    if (Codestatus) {
      this.showPanel = false;
      this.hidePanel = true;
      this.displayItemGrid = true;
      this.displayCodeGrid = true;
      this.getPromotionDetails(0);
    }else {
      this.showPanel = false;
      this.hidePanel = false;
      this.displayItemGrid = false;
      this.displayCodeGrid = true;
      this.getPromotionDetails(0);
    }
  }
  setItemGridsShoworHide(Itemstatus) {
    if (Itemstatus) {
      this.showPanel = false;
      this.hidePanel = true;
      this.displayItemGrid = true;
      this.displayCodeGrid = true;
      this.getPromotionDetails(0);
    }else {
      this.showPanel = false;
      this.hidePanel = false;
      this.displayItemGrid = true;
      this.displayCodeGrid = false;
      this.getPromotionDetails(0);
    }
  }
  getVpCustomersDetails() {
    let errMessage: any = [];
    this.promosCodesItemsService.getVpCustomersData()
        .subscribe(
          (vpCustomers) => {
            this.vpCustomersData = vpCustomers;
          },
          errorMsg => errMessage = <any>errorMsg
        );
  }
  getPromotionFields() {
    let errMessage: any = [];
    this.promosCodesItemsService.getPromotionOptions()
        .subscribe(
          (promotionFields) => {
            this.promotionFieldsArray = promotionFields.fields;
          },
          errorMsg => errMessage = <any>errorMsg
        );
  }
  getPromotionDetails = function (offset?, promotionSearch?) {
    this.promotionDataArray = [];
    promotionSearch = this.search;
    if (this.search.textValue) {
      if (offset === undefined) {
        offset = 0;
      }
    }
    if (this.search.radioValue === 'active') {
      this.search.radioValue = true;
    }else {
      this.search.radioValue = false;
    }
    let errMessage: any = [];
    this.promosCodesItemsService.getPromotionData(offset, promotionSearch)
                        .subscribe(
                          (promotionData) => {
                            this.promotionDataArray = promotionData[0];
                            this.offsetIndex = promotionData[1];
                            this.recordsPerPageIndex = promotionData[2];
                            this.totalRecords = promotionData[3];
                            this.totalPages = promotionData[4];
                            if (this.promotionDataArray.length !== 0) {
                              this.displayGrid = true;
                              this.displayLabel = false;
                            }else {
                              this.displayGrid = false;
                              this.displayLabel = true;
                            }
                          },
                          errorMsg => errMessage = <any>errorMsg
                        );
  };
  addNewPromotion() {
    this.showPanel = true;
    this.hidePanel = false;
    this.displayCodeGrid = false;
    this.displayItemGrid = false;
    this.displaySaveBtn = true;
    this.displayUpdateBtn = false;
    this.promotionTitle = 'Add New Promotion';
    this.vpc = 89985;
    this.promotion = {};
  }
  onCancel() {
    this.showPanel = false;
    this.hidePanel = true;
    this.displayCodeGrid = true;
    this.displayItemGrid = true;
    this.getPromotionDetails(0);
  }
  onChange(editData) {
    this.promotion = {};
    this.showPanel = true;
    this.hidePanel = false;
    this.displayCodeGrid = false;
    this.displayItemGrid = false;
    this.varReadOnly = true;
    this.displaySaveBtn = false;
    this.displayUpdateBtn = true;
    this.promotionTitle = 'Change Promotion';
    this.promotion.promDesc = editData.promDesc;
    this.promotion.startDate = editData.startDate;
    this.promotion.endDate = editData.endDate;
    this.promotion.active = editData.active;

    if (editData.vpcId) {
      this.vpc = editData.vpcId;
      this.promId = editData.promId;
    }else {
      this.vpc = 89985;
    }
  }
  savePromotion(formdata) {
    let errMessage: any = [];
    if (!formdata.active) { formdata.active = false; }
    for (let i = 0; i < this.vpCustomersData.length; i++) {
      if (this.vpCustomersData[i].vpcId === formdata.vpc) {
        this.promotion.vpcId = this.vpCustomersData[i].vpcId;
        this.promotion.vpcCode = this.vpCustomersData[i].vpcCode;
      }
    }
    this.promosCodesItemsService.addPromotionData(this.promotion)
                        .subscribe(
                          (savedPromotionDetails) => {
                            this.showPanel = false;
                            this.hidePanel = true;
                            this.displayCodeGrid = true;
                            this.displayItemGrid = true;
                            this.getPromotionDetails();
                          },
                          errorMsg => errMessage = <any>errorMsg
                        );
  }
  updatePromotion(formdata) {
    let errMessage: any = [];
    this.promotion = {};
    this.promotion.promDesc = formdata.description;
    this.promotion.startDate = formdata.startDate;
    this.promotion.endDate = formdata.endDate;
    this.promotion.active = formdata.active;
    for (let i = 0; i < this.vpCustomersData.length; i++) {
      if (this.vpCustomersData[i].vpcId === formdata.vpc) {
        this.promotion.vpcId = this.vpCustomersData[i].vpcId;
        this.promotion.vpcCode = this.vpCustomersData[i].vpcCode;
      }
    }
    this.promosCodesItemsService.updatePromotionData(this.promotion, this.promId)
                        .subscribe(
                          (updatedLocationDetails) => {
                            this.showPanel = false;
                            this.hidePanel = true;
                            this.displayCodeGrid = true;
                            this.displayItemGrid = true;
                            this.getPromotionDetails();
                          },
                          errorMsg => errMessage = <any>errorMsg
                        );
  }
}
