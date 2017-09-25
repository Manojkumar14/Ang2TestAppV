import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionItemsComponent } from './promotion-items.component';

describe('PromotionItemsComponent', () => {
  let component: PromotionItemsComponent;
  let fixture: ComponentFixture<PromotionItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
