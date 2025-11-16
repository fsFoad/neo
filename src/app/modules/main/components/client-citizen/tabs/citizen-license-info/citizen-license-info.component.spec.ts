import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenLicenseInfoComponent } from './citizen-license-info.component';

describe('CitizenLicenseInfoComponent', () => {
  let component: CitizenLicenseInfoComponent;
  let fixture: ComponentFixture<CitizenLicenseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenLicenseInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenLicenseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
