import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFrClientCitizenComponent } from './register-fr-client-citizen.component';

describe('RegisterFrClientCitizenComponent', () => {
  let component: RegisterFrClientCitizenComponent;
  let fixture: ComponentFixture<RegisterFrClientCitizenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFrClientCitizenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFrClientCitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
