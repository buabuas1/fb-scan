import { TestBed, inject } from '@angular/core/testing';

import { GroupFbService } from './group-fb.service';

describe('GroupFbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupFbService]
    });
  });

  it('should be created', inject([GroupFbService], (service: GroupFbService) => {
    expect(service).toBeTruthy();
  }));
});
