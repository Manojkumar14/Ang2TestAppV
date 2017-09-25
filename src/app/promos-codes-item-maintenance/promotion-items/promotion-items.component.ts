import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, FormGroupName, FormControl, FormControlName, Validators, NgForm } from '@angular/forms';
import { PromosCodesItemsService } from 'app/services/promos-codes-items.service';

@Component({
  selector: 'app-promotion-items',
  templateUrl: './promotion-items.component.html',
  styleUrls: ['./promotion-items.component.css']
})
export class PromotionItemsComponent implements OnChanges {
  @Input() selectedRowId;

  promotionItemForm: FormGroup;
  promotionItemTitle: any = 'Add/Change promotion item';
  promotionItem: any = {};
  promotionItemFieldsArray: any;
  promotionItemDataArray: any = [];
  promotionItemDataArrayCopy: any[];
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
      this.getPromotionItemsFields(this.selectedRowId);
      this.getPromotionItemsDetails(0, this.selectedRowId);
    }
  }

    getPromotionItemsFields(id) {
      let errMessage: any = [];
      this.promosCodesItemsService.getPromotionItemOptions(id)
          .subscribe(
            (promotionItemFields) => {
              this.promotionItemFieldsArray = promotionItemFields.fields;
            },
            errorMsg => errMessage = <any>errorMsg
          );
    }
    getPromotionItemsDetails(offset?, id?) {
      this.data = [];
      this.promotionItemDataArray = [];
      this.promotionItemDataArrayCopy = [];
      let errMessage: any = [];
      this.promosCodesItemsService.getPromotionItemData(offset, id)
                          .subscribe(
                            (promotionCodeData) => {
                              this.data.push(promotionCodeData[0]);
                              this.promotionItemDataArray = this.data[0];
                              this.promotionItemDataArrayCopy = this.data[0];
                              this.offsetIndex = promotionCodeData[1];
                              this.recordsPerPageIndex = promotionCodeData[2];
                              this.totalRecords = promotionCodeData[3];
                              this.totalPages = promotionCodeData[4];
                              if (this.promotionItemDataArrayCopy.length !== 0) {
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
