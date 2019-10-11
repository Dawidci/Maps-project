import { TestBed } from '@angular/core/testing';

import { AllWarehousesResolverService } from './all-warehouses-resolver.service';

describe('AllWarehousesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllWarehousesResolverService = TestBed.get(AllWarehousesResolverService);
    expect(service).toBeTruthy();
  });
});
