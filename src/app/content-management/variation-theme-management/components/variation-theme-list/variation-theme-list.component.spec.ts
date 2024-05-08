import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationThemeListComponent } from './variation-theme-list.component';

describe('VariationThemeListComponent', () => {
  let component: VariationThemeListComponent;
  let fixture: ComponentFixture<VariationThemeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationThemeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationThemeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
