import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationThemeAddAttributeComponent } from './variation-theme-add-attribute.component';

describe('VariationThemeAddAttributeComponent', () => {
  let component: VariationThemeAddAttributeComponent;
  let fixture: ComponentFixture<VariationThemeAddAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationThemeAddAttributeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationThemeAddAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
