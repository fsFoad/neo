import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanOperationComponent } from './loan-operation.component';

describe('LoanOperationComponent', () => {
  let component: LoanOperationComponent;
  let fixture: ComponentFixture<LoanOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanOperationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
