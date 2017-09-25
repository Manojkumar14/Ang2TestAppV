import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromosCodesItemMaintenanceComponent } from './promos-codes-item-maintenance.component';

describe('PromosCodesItemMaintenanceComponent', () => {
  let component: PromosCodesItemMaintenanceComponent;
  let fixture: ComponentFixture<PromosCodesItemMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromosCodesItemMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromosCodesItemMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
