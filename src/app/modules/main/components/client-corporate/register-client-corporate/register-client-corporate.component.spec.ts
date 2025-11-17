import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClientCorporateComponent } from './register-client-corporate.component';

describe('RegisterClientCorporateComponent', () => {
  let component: RegisterClientCorporateComponent;
  let fixture: ComponentFixture<RegisterClientCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterClientCorporateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterClientCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
