import { TestBed, inject } from '@angular/core/testing';

import { MemberApiService } from './member-api.service';

describe('MemberApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberApiService]
    });
  });

  it('should be created', inject([MemberApiService], (service: MemberApiService) => {
    expect(service).toBeTruthy();
  }));
});
