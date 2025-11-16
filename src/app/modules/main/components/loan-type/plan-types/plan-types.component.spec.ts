import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTypesComponent } from './plan-types.component';

describe('PlanTypesComponent', () => {
  let component: PlanTypesComponent;
  let fixture: ComponentFixture<PlanTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
