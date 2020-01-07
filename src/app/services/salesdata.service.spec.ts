import { TestBed } from '@angular/core/testing';

import { SalesDataService } from './salesdata.service';

describe('SalesdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesDataService = TestBed.get(SalesDataService);
    expect(service).toBeTruthy();
  });
});
