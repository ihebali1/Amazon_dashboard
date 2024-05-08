import { TestBed } from '@angular/core/testing';

import { GainServiceService } from './gain-service.service';

describe('GainServiceService', () => {
  let service: GainServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GainServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
