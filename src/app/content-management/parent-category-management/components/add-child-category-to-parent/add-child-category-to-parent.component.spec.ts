import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChildCategoryToParentComponent } from './add-child-category-to-parent.component';

describe('AddChildCategoryToParentComponent', () => {
  let component: AddChildCategoryToParentComponent;
  let fixture: ComponentFixture<AddChildCategoryToParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChildCategoryToParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChildCategoryToParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
