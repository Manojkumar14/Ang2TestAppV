import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionCodesComponent } from './promotion-codes.component';

describe('PromotionCodesComponent', () => {
  let component: PromotionCodesComponent;
  let fixture: ComponentFixture<PromotionCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
