import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationThemeDetailsComponent } from './variation-theme-details.component';

describe('VariationThemeDetailsComponent', () => {
  let component: VariationThemeDetailsComponent;
  let fixture: ComponentFixture<VariationThemeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationThemeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationThemeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
