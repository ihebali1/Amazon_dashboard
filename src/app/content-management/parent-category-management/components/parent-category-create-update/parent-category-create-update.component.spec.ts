import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentCategoryCreateUpdateComponent } from './parent-category-create-update.component';

describe('ParentCategoryCreateUpdateComponent', () => {
  let component: ParentCategoryCreateUpdateComponent;
  let fixture: ComponentFixture<ParentCategoryCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentCategoryCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentCategoryCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
