import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterIrClientCorporateComponent } from './register-ir-client-corporate.component';

describe('RegisterIrClientCorporateComponent', () => {
  let component: RegisterIrClientCorporateComponent;
  let fixture: ComponentFixture<RegisterIrClientCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterIrClientCorporateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterIrClientCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
