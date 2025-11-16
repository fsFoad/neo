import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanGoalComponent } from './loan-goal.component';

describe('LoanGoalComponent', () => {
  let component: LoanGoalComponent;
  let fixture: ComponentFixture<LoanGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanGoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
