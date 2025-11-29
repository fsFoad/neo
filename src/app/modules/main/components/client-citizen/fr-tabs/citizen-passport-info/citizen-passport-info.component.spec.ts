import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenPassportInfoComponent } from './citizen-passport-info.component';

describe('CitizenPassportInfoComponent', () => {
  let component: CitizenPassportInfoComponent;
  let fixture: ComponentFixture<CitizenPassportInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenPassportInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenPassportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
