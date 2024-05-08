import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCategoryVariationThemeComponent } from './child-category-variation-theme.component';

describe('ChildCategoryVariationThemeComponent', () => {
  let component: ChildCategoryVariationThemeComponent;
  let fixture: ComponentFixture<ChildCategoryVariationThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildCategoryVariationThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCategoryVariationThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
