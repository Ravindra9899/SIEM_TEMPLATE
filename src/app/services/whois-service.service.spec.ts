import { TestBed } from '@angular/core/testing';

import { WhoisServiceService } from './whois-service.service';

describe('WhoisServiceService', () => {
  let service: WhoisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhoisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
