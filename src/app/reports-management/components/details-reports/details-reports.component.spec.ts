import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReportsComponent } from './details-reports.component';

describe('DetailsReportsComponent', () => {
  let component: DetailsReportsComponent;
  let fixture: ComponentFixture<DetailsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
