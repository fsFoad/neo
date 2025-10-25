import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanFundingSourcesComponent } from './loan-funding-sources.component';

describe('LoanFundingSourcesComponent', () => {
  let component: LoanFundingSourcesComponent;
  let fixture: ComponentFixture<LoanFundingSourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanFundingSourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanFundingSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
