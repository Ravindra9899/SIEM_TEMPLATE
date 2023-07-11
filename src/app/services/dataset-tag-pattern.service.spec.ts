import { TestBed } from '@angular/core/testing';

import { DatasetTagPatternService } from './dataset-tag-pattern.service';

describe('DatasetTagPatternService', () => {
  let service: DatasetTagPatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasetTagPatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
