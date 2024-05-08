import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributeToChildComponent } from './add-attribute-to-child.component';

describe('AddAttributeToChildComponent', () => {
  let component: AddAttributeToChildComponent;
  let fixture: ComponentFixture<AddAttributeToChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttributeToChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributeToChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
