import { TestBed, inject } from '@angular/core/testing';

import { PrintTemplateService } from './print-template.service';

describe('PrintTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrintTemplateService]
    });
  });

  it('should be created', inject([PrintTemplateService], (service: PrintTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
