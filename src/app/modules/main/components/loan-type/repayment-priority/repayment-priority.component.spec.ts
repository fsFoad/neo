import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentPriorityComponent } from './repayment-priority.component';

describe('RepaymentPriorityComponent', () => {
  let component: RepaymentPriorityComponent;
  let fixture: ComponentFixture<RepaymentPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepaymentPriorityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepaymentPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
