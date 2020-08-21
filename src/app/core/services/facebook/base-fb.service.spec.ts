import { TestBed, inject } from '@angular/core/testing';

import { BaseFbService } from './base-fb.service';

describe('BaseFbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseFbService]
    });
  });

  it('should be created', inject([BaseFbService], (service: BaseFbService) => {
    expect(service).toBeTruthy();
  }));
});
