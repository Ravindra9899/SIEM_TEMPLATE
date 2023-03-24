import { TestBed } from '@angular/core/testing';

import { IpListService } from './ip-list.service';

describe('IpListService', () => {
  let service: IpListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
