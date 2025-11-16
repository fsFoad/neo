import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestClientRegisterComponent } from './guest-client-register.component';

describe('GuestClientRegisterComponent', () => {
  let component: GuestClientRegisterComponent;
  let fixture: ComponentFixture<GuestClientRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestClientRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestClientRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
