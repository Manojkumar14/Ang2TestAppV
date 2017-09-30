import { Component, OnChanges, Input, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormGroupName, FormControl, FormControlName, Validators, NgForm } from '@angular/forms';
import { PromosCodesItemsService } from 'app/services/promos-codes-items.service';
import { GlobalSearchService } from 'app/services/global-search.service';

@Component({
  selector: 'app-promotion-items',
  templateUrl: './promotion-items.component.html',
  styleUrls: ['./promotion-items.component.css']
})
export class PromotionItemsComponent implements OnChanges {
  @Input() selectedPromoId;
  @Input() selectedPromoDesc;

  @Output() setShowItemGridsOrNot: EventEmitter<any> = new EventEmitter();

  promotionItemForm: FormGroup;
  promotionItemTitle: any = 'Add/Change promotion item';
  promotionItem: any = {};
  promotionItemFieldsArray: any;
  promotionItemDataArray: any = [];
  promotionItemDataArrayCopy: any[];
  itemsList: any[];
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

  constructor(private promosCodesItemsService: PromosCodesItemsService, private globalSearchService: GlobalSearchService) { }

  ngOnChanges(changes: any): void {
    if (changes.selectedPromoId) {
      this.getPromotionItemsFields(this.selectedPromoId);
      this.getPromotionItemsDetails(0, this.selectedPromoId);
    }
  }
  // getItemList() {
  //   let errMessage: any = [];
  //   this.globalSearchService.getGlobalSearchData()
  //       .subscribe(
  //         (items) => {
  //           this.itemsList = items;
  //         },
  //         errorMsg => errMessage = <any>errorMsg
  //       );
  // }
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
    addNewPromotionItem() {
      this.showPanel = true;
      this.hidePanel = false;
      this.displaySaveBtn = true;
      this.displayUpdateBtn = false;
      this.promotionItemTitle = 'Add New Promotion Item';
      this.setShowItemGridsOrNot.emit(false);
    }
    onCancel() {
      this.showPanel = false;
      this.hidePanel = true;
      this.displayGrid = this.hidePanel;
      this.getPromotionItemsDetails(0, this.selectedPromoId);
      this.setShowItemGridsOrNot.emit(true);
    }
    onChange(editData) {
      console.log(editData);
      this.promotionItem = {};
      this.showPanel = true;
      this.hidePanel = false;
      this.varReadOnly = true;
      this.displaySaveBtn = false;
      this.displayUpdateBtn = true;
      this.promotionItemTitle = 'Change Promotion Item';
      this.setShowItemGridsOrNot.emit(false);
    }
}
