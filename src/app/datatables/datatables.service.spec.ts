import { TestBed } from '@angular/core/testing';

import { DatatablesService } from './datatables.service';

describe('DatatablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatatablesService = TestBed.get(DatatablesService);
    expect(service).toBeTruthy();
  });
});
