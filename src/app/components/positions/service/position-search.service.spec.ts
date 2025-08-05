import { TestBed } from '@angular/core/testing';

import { PositionSearchService } from './position-search.service';

describe('PositionSearchService', () => {
  let service: PositionSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
