import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationThemeCreateUpdateComponent } from './variation-theme-create-update.component';

describe('VariationThemeCreateUpdateComponent', () => {
  let component: VariationThemeCreateUpdateComponent;
  let fixture: ComponentFixture<VariationThemeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationThemeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationThemeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
