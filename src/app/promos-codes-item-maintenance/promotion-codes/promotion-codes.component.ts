import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormGroupName, FormControl, FormControlName, Validators, NgForm } from '@angular/forms';
import { PromosCodesItemsService } from 'app/services/promos-codes-items.service';
@Component({
  selector: 'app-promotion-codes',
  templateUrl: './promotion-codes.component.html',
  styleUrls: ['./promotion-codes.component.css']
})
export class PromotionCodesComponent implements OnChanges {
  @Input() selectedPromoId;
  @Input() selectedPromoDesc;
  @Input() selectedPromotionDetails;

  @Output() setShowCodeGridsOrNot: EventEmitter<any> = new EventEmitter();

  promotionCodeForm: FormGroup;
  promotionCodeTitle: any = 'Add/Change promotion code';
  promotionCode: any = {};
  promotionCodeFieldsArray: any;
  promotionCodeDataArray: any = [];
  promotionCodeDataArrayCopy: any[];
  showPanel: any = false;
  hidePanel: any = true;
  varReadOnly: any = false;
  displaySaveBtn: any = true;
  displayUpdateBtn: any = false;
  errorMsg = '';
  displayGrid = false;
  displayLabel = false;
  data: any = [];
  offsetIndex: any = 0;
  recordsPerPageIndex: any = 0;
  totalRecords: any = 0;
  totalPages: any = 0;

  constructor(private promosCodesItemsService: PromosCodesItemsService) { }

  ngOnChanges(changes: any): void {
    if (changes.selectedPromoId) {
      console.log(this.selectedPromotionDetails);
      this.getPromotionCodesFields(this.selectedPromoId);
      this.getPromotionCodesDetails(0, this.selectedPromoId);
    }
  }
  getPromotionCodesFields(id) {
    let errMessage: any = [];
    this.promosCodesItemsService.getPromotionCodeOptions(id)
        .subscribe(
          (promotionCodeFields) => {
            this.promotionCodeFieldsArray = promotionCodeFields.fields;
          },
          errorMsg => errMessage = <any>errorMsg
        );
  }
  getPromotionCodesDetails(offset?, id?) {
    this.data = [];
    this.promotionCodeDataArray = [];
    this.promotionCodeDataArrayCopy = [];
    let errMessage: any = [];
    this.promosCodesItemsService.getPromotionCodeData(offset, id)
                        .subscribe(
                          (promotionCodeData) => {
                            this.data.push(promotionCodeData[0]);
                            this.promotionCodeDataArray = this.data[0];
                            this.promotionCodeDataArrayCopy = this.data[0];
                            this.offsetIndex = promotionCodeData[1];
                            this.recordsPerPageIndex = promotionCodeData[2];
                            this.totalRecords = promotionCodeData[3];
                            this.totalPages = promotionCodeData[4];
                            if (this.promotionCodeDataArrayCopy.length !== 0) {
                              this.displayGrid = true;
                              this.displayLabel = false;
                            }else {
                              this.displayGrid = false;
                              this.displayLabel = true;
                            }
                          },
                          errorMsg => errMessage = <any>errorMsg
                        );
  }
  addNewPromotionCode() {
    this.showPanel = true;
    this.hidePanel = false;
    this.displaySaveBtn = true;
    this.displayUpdateBtn = false;
    this.promotionCodeTitle = 'Add New Promotion Code';
    this.setShowCodeGridsOrNot.emit(false);
  }
  onCancel() {
    this.showPanel = false;
    this.hidePanel = true;
    this.displayGrid = this.hidePanel;
    this.promotionCode = {};
    this.getPromotionCodesDetails(0, this.selectedPromoId);
    this.setShowCodeGridsOrNot.emit(true);
  }
  onChange(editData) {
    console.log(editData);
    this.promotionCode = {};
    this.showPanel = true;
    this.hidePanel = false;
    this.varReadOnly = true;
    this.displaySaveBtn = false;
    this.displayUpdateBtn = true;
    this.promotionCodeTitle = 'Change Promotion Code';
    this.setShowCodeGridsOrNot.emit(false);
    this.promotionCode = editData;
    this.promotionCode.startDate = editData.startDate.substring(0, 10);
    this.promotionCode.endDate = editData.endDate.substring(0, 10);
  }
  savePromotionCode(formData) {
    let errMessage: any = [];
    // const datePattern: any = '00:00:00';
    if (this.selectedPromotionDetails) {
      formData.vpcId = this.selectedPromotionDetails.vpcId;
      formData.vpcCode = this.selectedPromotionDetails.vpcCode;
    }else {
      formData.vpcId = 130;
      formData.vpcCode = 'FFS';
    }
    if (!formData.active) {
      formData.active = false;
    }
    if (!formData.allowOverpayment) {
      formData.allowOverpayment = false;
    }
    formData.promId = this.selectedPromoId;
    // formData.startDate = new Date(formData.startDate);
    // formData.endDate = new Date(formData.endDate);
    console.log(formData);
    this.promosCodesItemsService.addPromotionCodeData(this.selectedPromoId, formData)
                                .subscribe(
                                  (savedPromotionCodeDetails) => {
                                    this.showPanel = false;
                                    this.hidePanel = true;
                                    this.promotionCode = {};
                                    this.setShowCodeGridsOrNot.emit(true);
                                    this.getPromotionCodesDetails(0, this.selectedPromoId);
                                  },
                                  errorMsg => errMessage = <any>errorMsg
                                );
  }
  updatePromotionCode(formData) {
    let errMessage: any = [];
    this.promosCodesItemsService.updatePromotionCodeData(this.selectedPromoId, formData.promotionCodeId, formData)
                        .subscribe(
                          (updatedPromotionCodeDetails) => {
                            this.showPanel = false;
                            this.hidePanel = true;
                            this.promotionCode = {};
                            this.setShowCodeGridsOrNot.emit(true);
                            this.getPromotionCodesDetails(0, this.selectedPromoId);
                          },
                          errorMsg => errMessage = <any>errorMsg
                        );
  }

}
