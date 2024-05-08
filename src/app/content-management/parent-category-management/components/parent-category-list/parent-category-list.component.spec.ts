import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentCategoryListComponent } from './parent-category-list.component';

describe('ParentCategoryListComponent', () => {
  let component: ParentCategoryListComponent;
  let fixture: ComponentFixture<ParentCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
