import { TestBed } from '@angular/core/testing';

import { ScanStatusService } from './scan-status.service';

describe('ScanStatusService', () => {
  let service: ScanStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
