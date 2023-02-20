import { TestBed } from '@angular/core/testing';

import { ConfigProcessorService } from './config-processor.service';

describe('ConfigProcessorService', () => {
  let service: ConfigProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
