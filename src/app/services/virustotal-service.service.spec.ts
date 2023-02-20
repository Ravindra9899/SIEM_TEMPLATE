import { TestBed } from '@angular/core/testing';

import { VirustotalServiceService } from './virustotal-service.service';

describe('VirustotalServiceService', () => {
  let service: VirustotalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirustotalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
