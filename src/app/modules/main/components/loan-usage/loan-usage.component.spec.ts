import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanUsageComponent } from './loan-usage.component';

describe('LoanUsageComponent', () => {
  let component: LoanUsageComponent;
  let fixture: ComponentFixture<LoanUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
