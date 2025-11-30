import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenFrPassportInfoComponent } from './citizen-fr-passport-info.component';

describe('CitizenPassportInfoComponent', () => {
  let component: CitizenFrPassportInfoComponent;
  let fixture: ComponentFixture<CitizenFrPassportInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenFrPassportInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenFrPassportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
