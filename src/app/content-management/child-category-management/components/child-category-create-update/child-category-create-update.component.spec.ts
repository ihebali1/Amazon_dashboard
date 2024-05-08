import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCategoryCreateUpdateComponent } from './child-category-create-update.component';

describe('ChildCategoryCreateUpdateComponent', () => {
  let component: ChildCategoryCreateUpdateComponent;
  let fixture: ComponentFixture<ChildCategoryCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildCategoryCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCategoryCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
