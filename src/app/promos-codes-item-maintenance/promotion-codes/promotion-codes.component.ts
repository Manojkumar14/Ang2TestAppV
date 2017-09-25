import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, FormGroupName, FormControl, FormControlName, Validators, NgForm } from '@angular/forms';
import { PromosCodesItemsService } from 'app/services/promos-codes-items.service';
@Component({
  selector: 'app-promotion-codes',
  templateUrl: './promotion-codes.component.html',
  styleUrls: ['./promotion-codes.component.css']
})
export class PromotionCodesComponent implements OnChanges {
  @Input() selectedRowId;

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
    if (changes.selectedRowId) {
      this.getPromotionCodesFields(this.selectedRowId);
      this.getPromotionCodesDetails(0, this.selectedRowId);
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

}
