import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSettlmentComponent } from './loan-settlment.component';

describe('LoanSettlmentComponent', () => {
  let component: LoanSettlmentComponent;
  let fixture: ComponentFixture<LoanSettlmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanSettlmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanSettlmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
