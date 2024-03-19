import { TestBed } from '@angular/core/testing';

import { SudentService } from './sudent.service';

describe('SudentService', () => {
  let service: SudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
