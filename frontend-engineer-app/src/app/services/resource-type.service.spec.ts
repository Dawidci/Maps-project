import { TestBed } from '@angular/core/testing';

import { ResourceTypeService } from './resource-type.service';

describe('ResourceTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceTypeService = TestBed.get(ResourceTypeService);
    expect(service).toBeTruthy();
  });
});
