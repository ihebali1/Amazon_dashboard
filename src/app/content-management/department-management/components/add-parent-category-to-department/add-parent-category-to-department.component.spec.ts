import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentCategoryToDepartmentComponent } from './add-parent-category-to-department.component';

describe('AddParentCategoryToDepartmentComponent', () => {
  let component: AddParentCategoryToDepartmentComponent;
  let fixture: ComponentFixture<AddParentCategoryToDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParentCategoryToDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParentCategoryToDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
