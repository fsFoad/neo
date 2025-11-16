import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClientCitizenComponent } from './register-client-citizen.component';

describe('RegisterClientCitizenComponent', () => {
  let component: RegisterClientCitizenComponent;
  let fixture: ComponentFixture<RegisterClientCitizenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterClientCitizenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterClientCitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
