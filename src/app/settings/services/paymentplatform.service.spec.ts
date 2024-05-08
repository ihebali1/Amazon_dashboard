import { TestBed } from '@angular/core/testing';

import { PaymentplatformService } from './paymentplatform.service';

describe('PaymentplatformService', () => {
  let service: PaymentplatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentplatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
