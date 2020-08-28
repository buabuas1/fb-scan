import { TestBed, inject } from '@angular/core/testing';

import { BdsTypeService } from './bds-type.service';

describe('BdsTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BdsTypeService]
    });
  });

  it('should be created', inject([BdsTypeService], (service: BdsTypeService) => {
    expect(service).toBeTruthy();
  }));
});
