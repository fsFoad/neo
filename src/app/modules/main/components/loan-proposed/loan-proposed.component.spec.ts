import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanProposedComponent } from './loan-proposed.component';

describe('LoanProposedComponent', () => {
  let component: LoanProposedComponent;
  let fixture: ComponentFixture<LoanProposedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanProposedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanProposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
