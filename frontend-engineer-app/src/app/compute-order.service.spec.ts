import { TestBed } from '@angular/core/testing';

import { ComputeOrderService } from './compute-order.service';

describe('ComputeOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComputeOrderService = TestBed.get(ComputeOrderService);
    expect(service).toBeTruthy();
  });
});
