import { TestBed } from '@angular/core/testing';

import { ElasticBackendService } from './elastic-backend.service';

describe('ElasticBackendService', () => {
  let service: ElasticBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElasticBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
