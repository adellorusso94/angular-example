import { TestBed } from '@angular/core/testing';

import { CrisisCenterService } from './crisis-center.service';

describe('CrisisCenterService', () => {
  let service: CrisisCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrisisCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
