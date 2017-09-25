import { TestBed, inject } from '@angular/core/testing';

import { PromosCodesItemsService } from './promos-codes-items.service';

describe('PromosCodesItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromosCodesItemsService]
    });
  });

  it('should be created', inject([PromosCodesItemsService], (service: PromosCodesItemsService) => {
    expect(service).toBeTruthy();
  }));
});
