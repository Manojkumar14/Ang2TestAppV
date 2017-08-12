import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMaintenanceComponent } from './location-maintenance.component';

describe('LocationMaintenanceComponent', () => {
  let component: LocationMaintenanceComponent;
  let fixture: ComponentFixture<LocationMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
