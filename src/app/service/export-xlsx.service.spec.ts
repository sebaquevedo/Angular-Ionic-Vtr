import { TestBed } from '@angular/core/testing';

import { ExportXLSXService } from './export-xlsx.service';

describe('ExportXLSXService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportXLSXService = TestBed.get(ExportXLSXService);
    expect(service).toBeTruthy();
  });
});
