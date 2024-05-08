import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectPayoutComponent } from './reject-payout.component';

describe('RejectPayoutComponent', () => {
  let component: RejectPayoutComponent;
  let fixture: ComponentFixture<RejectPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectPayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
