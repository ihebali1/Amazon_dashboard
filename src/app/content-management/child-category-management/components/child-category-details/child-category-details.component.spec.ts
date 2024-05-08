import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCategoryDetailsComponent } from './child-category-details.component';

describe('ChildCategoryDetailsComponent', () => {
  let component: ChildCategoryDetailsComponent;
  let fixture: ComponentFixture<ChildCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildCategoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
