import { TestBed, inject } from '@angular/core/testing';

import { GroupManageApiService } from './group-manage-api.service';

describe('GroupManageApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupManageApiService]
    });
  });

  it('should be created', inject([GroupManageApiService], (service: GroupManageApiService) => {
    expect(service).toBeTruthy();
  }));
});
