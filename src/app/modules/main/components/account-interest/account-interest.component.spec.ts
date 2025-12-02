import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInterestComponent } from './account-interest.component';

describe('AccountInterestComponent', () => {
  let component: AccountInterestComponent;
  let fixture: ComponentFixture<AccountInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountInterestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
