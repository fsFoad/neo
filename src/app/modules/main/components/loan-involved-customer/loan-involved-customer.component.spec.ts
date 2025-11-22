import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanInvolvedCustomerComponent } from './loan-involved-customer.component';

describe('LoanInvolvedCustomerComponent', () => {
  let component: LoanInvolvedCustomerComponent;
  let fixture: ComponentFixture<LoanInvolvedCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanInvolvedCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanInvolvedCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
