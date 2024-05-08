import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderShippingInfoComponent } from './order-shipping-info.component';

describe('OrderShippingInfoComponent', () => {
  let component: OrderShippingInfoComponent;
  let fixture: ComponentFixture<OrderShippingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderShippingInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderShippingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
