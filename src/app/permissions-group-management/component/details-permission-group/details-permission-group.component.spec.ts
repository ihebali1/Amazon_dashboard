import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPermissionGroupComponent } from './details-permission-group.component';

describe('DetailsPermissionGroupComponent', () => {
  let component: DetailsPermissionGroupComponent;
  let fixture: ComponentFixture<DetailsPermissionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPermissionGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPermissionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
