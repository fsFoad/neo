import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFrClientCorporateComponent } from './register-fr-client-corporate.component';

describe('RegisterFrClientCorporateComponent', () => {
  let component: RegisterFrClientCorporateComponent;
  let fixture: ComponentFixture<RegisterFrClientCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFrClientCorporateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFrClientCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
