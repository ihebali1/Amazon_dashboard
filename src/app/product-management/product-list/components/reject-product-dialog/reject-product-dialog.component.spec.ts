import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectProductDialogComponent } from './reject-product-dialog.component';

describe('RejectProductDialogComponent', () => {
  let component: RejectProductDialogComponent;
  let fixture: ComponentFixture<RejectProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectProductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
