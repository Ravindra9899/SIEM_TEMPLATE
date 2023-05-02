import { TestBed } from '@angular/core/testing';

import { ConfigInnerhtmlGeneratorService } from './config-innerhtml-generator.service';

describe('ConfigInnerhtmlGeneratorService', () => {
  let service: ConfigInnerhtmlGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigInnerhtmlGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
