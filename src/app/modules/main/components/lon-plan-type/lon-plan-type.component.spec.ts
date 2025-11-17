import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LonPlanTypeComponent } from './lon-plan-type.component';

describe('LonPlanTypeComponent', () => {
  let component: LonPlanTypeComponent;
  let fixture: ComponentFixture<LonPlanTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LonPlanTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LonPlanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
