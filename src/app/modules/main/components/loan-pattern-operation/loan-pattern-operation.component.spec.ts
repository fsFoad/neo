import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPatternOperationComponent } from './loan-pattern-operation.component';

describe('LoanPatternOperationComponent', () => {
  let component: LoanPatternOperationComponent;
  let fixture: ComponentFixture<LoanPatternOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanPatternOperationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanPatternOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
