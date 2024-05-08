import { TestBed } from '@angular/core/testing';

import { VariationThemeService } from './variation-theme.service';

describe('VariationThemeService', () => {
  let service: VariationThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariationThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
