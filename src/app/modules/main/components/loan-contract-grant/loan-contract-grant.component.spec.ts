import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanContractGrantComponent } from './loan-contract-grant.component';

describe('LoanContractGrantComponent', () => {
  let component: LoanContractGrantComponent;
  let fixture: ComponentFixture<LoanContractGrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanContractGrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanContractGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
