import { TestBed, inject } from '@angular/core/testing';

import { ToolKitService } from './tool-kit.service';

describe('ToolKitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolKitService]
    });
  });

  it('should be created', inject([ToolKitService], (service: ToolKitService) => {
    expect(service).toBeTruthy();
  }));
});
