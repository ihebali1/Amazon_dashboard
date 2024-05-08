import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCategoryListComponent } from './child-category-list.component';

describe('ChildCategoryListComponent', () => {
  let component: ChildCategoryListComponent;
  let fixture: ComponentFixture<ChildCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
