import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermissionGroupComponent } from './edit-permission-group.component';

describe('EditPermissionGroupComponent', () => {
  let component: EditPermissionGroupComponent;
  let fixture: ComponentFixture<EditPermissionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPermissionGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPermissionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
