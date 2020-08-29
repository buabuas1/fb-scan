import { TestBed, inject } from '@angular/core/testing';

import { BdsContentApiService } from './bds-content-api.service';

describe('BdsContentApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BdsContentApiService]
    });
  });

  it('should be created', inject([BdsContentApiService], (service: BdsContentApiService) => {
    expect(service).toBeTruthy();
  }));
});
