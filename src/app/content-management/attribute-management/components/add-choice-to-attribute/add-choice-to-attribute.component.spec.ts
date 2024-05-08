import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChoiceToAttributeComponent } from './add-choice-to-attribute.component';

describe('AddChoiceToAttributeComponent', () => {
  let component: AddChoiceToAttributeComponent;
  let fixture: ComponentFixture<AddChoiceToAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChoiceToAttributeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChoiceToAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
