import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeCreateUpdateComponent } from './attribute-create-update.component';

describe('AttributeCreateUpdateComponent', () => {
  let component: AttributeCreateUpdateComponent;
  let fixture: ComponentFixture<AttributeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
