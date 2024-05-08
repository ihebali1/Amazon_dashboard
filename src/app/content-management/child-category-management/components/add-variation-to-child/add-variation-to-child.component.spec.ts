import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVariationToChildComponent } from './add-variation-to-child.component';

describe('AddVariationToChildComponent', () => {
  let component: AddVariationToChildComponent;
  let fixture: ComponentFixture<AddVariationToChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVariationToChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVariationToChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
