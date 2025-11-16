import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestReasonManagementComponent } from './guest-reason-management.component';

describe('GuestReasonManagementComponent', () => {
  let component: GuestReasonManagementComponent;
  let fixture: ComponentFixture<GuestReasonManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestReasonManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestReasonManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
