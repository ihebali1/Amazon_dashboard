import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentCategoryDetailsComponent } from './parent-category-details.component';

describe('ParentCategoryDetailsComponent', () => {
  let component: ParentCategoryDetailsComponent;
  let fixture: ComponentFixture<ParentCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentCategoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
