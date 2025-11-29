import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFrConfirmationInfoComponent } from './citizen-fr-confirmation-info.component';

describe('CitizenFrConfirmationInfoComponent', () => {
  let component: CitizenFrConfirmationInfoComponent;
  let fixture: ComponentFixture<CitizenFrConfirmationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenFrConfirmationInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenFrConfirmationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
