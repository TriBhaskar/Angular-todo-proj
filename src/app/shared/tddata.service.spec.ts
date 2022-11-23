import { TestBed } from '@angular/core/testing';

import { TddataService } from './tddata.service';

describe('TddataService', () => {
  let service: TddataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TddataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
