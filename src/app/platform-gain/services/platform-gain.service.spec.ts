import { TestBed } from '@angular/core/testing';

import { PlatformGainService } from './platform-gain.service';

describe('PlatformGainService', () => {
  let service: PlatformGainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformGainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
