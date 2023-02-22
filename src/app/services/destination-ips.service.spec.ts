import { TestBed } from '@angular/core/testing';

import { DestinationIpsService } from './destination-ips.service';

describe('DestinationIpsService', () => {
  let service: DestinationIpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinationIpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
