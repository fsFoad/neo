import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestReasonRegisterComponent } from './guest-reason-register.component';

describe('GuestReasonRegisterComponent', () => {
  let component: GuestReasonRegisterComponent;
  let fixture: ComponentFixture<GuestReasonRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestReasonRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestReasonRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
