import { TestBed } from '@angular/core/testing';

import { GupshupService } from './gupshup.service';

describe('GupshupService', () => {
  let service: GupshupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GupshupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
