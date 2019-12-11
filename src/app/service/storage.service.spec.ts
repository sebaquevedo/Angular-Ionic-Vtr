import { TestBed } from '@angular/core/testing';

import { StorageUtilService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageUtilService = TestBed.get(StorageUtilService);
    expect(service).toBeTruthy();
  });
});
