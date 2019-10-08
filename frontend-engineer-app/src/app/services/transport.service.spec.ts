import { TestBed } from '@angular/core/testing';

import { TransportService } from './transport.service';

describe('TransportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransportService = TestBed.get(TransportService);
    expect(service).toBeTruthy();
  });
});
