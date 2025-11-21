import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRefoundInformationComponent } from './loan-refound-information.component';

describe('LoanRefoundInformationComponent', () => {
  let component: LoanRefoundInformationComponent;
  let fixture: ComponentFixture<LoanRefoundInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanRefoundInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanRefoundInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
