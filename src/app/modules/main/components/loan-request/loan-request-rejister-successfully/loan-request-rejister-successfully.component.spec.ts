import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestRejisterSuccessfullyComponent } from './loan-request-rejister-successfully.component';

describe('LoanRequestRejisterSuccessfullyComponent', () => {
  let component: LoanRequestRejisterSuccessfullyComponent;
  let fixture: ComponentFixture<LoanRequestRejisterSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanRequestRejisterSuccessfullyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanRequestRejisterSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
