import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenConfirmationInfoComponent } from './citizen-confirmation-info.component';

describe('CitizenConfirmationInfoComponent', () => {
  let component: CitizenConfirmationInfoComponent;
  let fixture: ComponentFixture<CitizenConfirmationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenConfirmationInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenConfirmationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
