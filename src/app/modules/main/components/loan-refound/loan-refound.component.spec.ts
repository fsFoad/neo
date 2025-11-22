import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRefoundComponent } from './loan-refound.component';

describe('LoanRefoundComponent', () => {
  let component: LoanRefoundComponent;
  let fixture: ComponentFixture<LoanRefoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanRefoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanRefoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
